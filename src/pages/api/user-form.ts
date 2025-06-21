import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { IncomingForm, Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Disable Next.js body parser because we use formidable for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Check environment variables early
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables!');
}

// Initialize Supabase client with service role key (server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      // Parse the incoming form with files
      const { fields, files } = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
        const form = new IncomingForm({ keepExtensions: true });
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

      // Extract invoice file (assuming input field name is 'invoice')
 
const invoiceFile = Array.isArray(files.invoice) ? files.invoice[0] : files.invoice;


      if (!invoiceFile) {
        return res.status(400).json({ error: 'Invoice file is required' });
      }

      const fileExt = path.extname(invoiceFile.originalFilename || '');
      const fileName = `${uuidv4()}${fileExt}`;
      const filePath = `invoices/${fileName}`;

      const fileBuffer = fs.readFileSync(invoiceFile.filepath);

      // Upload the invoice file to Supabase Storage bucket named 'invoice'
      const { error: uploadError } = await supabase.storage
        .from('invoice')
        .upload(filePath, fileBuffer, {
          contentType: invoiceFile.mimetype || 'application/octet-stream',
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload invoice', details: uploadError });
      }

      // Get public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage.from('invoice').getPublicUrl(filePath);
      const documentUrl = publicUrlData.publicUrl;

      // Helper to get string from form field
      const getFieldString = (field: string | string[] | undefined): string => {
        if (Array.isArray(field)) return field[0] || '';
        if (typeof field === 'string') return field;
        return '';
      };

      // Prepare data to insert in 'companydb'
      const formData = {
        user_id: userId,
        companyname: getFieldString(fields.companyname),
        tenderstartdate: getFieldString(fields.tenderstartdate),
        tenderenddate: getFieldString(fields.tenderenddate),
        companynumber: getFieldString(fields.companynumber),
        email: getFieldString(fields.email),
        phonenumber: getFieldString(fields.phonenumber),
        address: getFieldString(fields.address),
        tenderworth: parseInt(getFieldString(fields.tenderworth), 10) || 0,
        margin: parseInt(getFieldString(fields.margin), 10) || 0,
        gstnumber: getFieldString(fields.gstnumber),
        supplyto: getFieldString(fields.supplyto),
        stategovernment: getFieldString(fields.stategovernment),
        document: documentUrl,
      };

      const { error: insertError } = await supabase.from('companydb').insert([formData]);

      if (insertError) {
        console.error('Insert error:', insertError);
        return res.status(500).json({ error: 'Failed to save form data', details: insertError });
      }

      return res.status(200).json({ success: true, url: documentUrl });
    } catch (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Form parsing failed', details: err });
    }
  } else if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('companydb')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }); // requires created_at column in your table

      if (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ error: 'Failed to fetch submissions', details: error });
      }

      return res.status(200).json({ submissions: data });
    } catch (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ error: 'Failed to fetch submissions', details: err });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
