// src/pages/api/user-form.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('companydb')
      .select('*')
      .eq('user_id', userId)
      .order('id', { ascending: false });

    if (error) {
      console.error('GET error:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }

    return res.status(200).json({ forms: data });
  }

  if (req.method === 'POST') {
    // Destructure expected fields from req.body, convert keys to lowercase
    const {
      companyname,
      tenderstartdate,
      tenderenddate,
      companynumber,
      email,
      phonenumber,
      address,
      tenderworth,
      margin,
      gstnumber,
      supplyto,
      stategovernment,
      document,
    } = req.body;

    const formData = {
      user_id: userId,
      companyname,
      tenderstartdate,
      tenderenddate,
      companynumber,
      email,
      phonenumber,
      address,
      tenderworth,
      margin,
      gstnumber,
      supplyto,
      stategovernment,
      document,
    };

    const { error } = await supabase.from('companydb').insert([formData]);

    if (error) {
      console.error('POST error:', error);
      return res.status(500).json({ error: 'Failed to save form data' });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
