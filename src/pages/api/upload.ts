import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabaseServer';
import formidable, { File } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // disable Next.js body parsing, use formidable instead
  },
};

type ResponseData = {
  publicUrl?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    try {
      const fileOrFiles = files.file;

      let file: File;

      if (Array.isArray(fileOrFiles)) {
        file = fileOrFiles[0];
      } else if (fileOrFiles) {
        file = fileOrFiles;
      } else {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileBuffer = fs.readFileSync(file.filepath);

      // Upload the file to Supabase Storage
      const fileExt = file.originalFilename?.split('.').pop() || 'dat';
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabaseServer.storage
        .from('invoice') // replace with your bucket name
        .upload(fileName, fileBuffer, {
          contentType: file.mimetype || undefined,
        });

      if (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }

      // Get the public URL of the uploaded file
      const { data } = supabaseServer.storage
        .from('invoice')
        .getPublicUrl(fileName);

      return res.status(200).json({ publicUrl: data.publicUrl });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Failed to upload file' });
    }
  });
}
