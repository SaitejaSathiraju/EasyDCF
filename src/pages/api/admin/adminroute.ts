import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin123';
const ADMIN_PASSWORD = 'secret456';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get credentials from query or headers (use headers in production)
  const { username, password } = req.query;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin credentials' });
  }

  try {
    const { data, error } = await supabase
      .from('companydb')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('GET error:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }

    return res.status(200).json({ count: data.length, forms: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
