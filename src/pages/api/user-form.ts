import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import db from '../../lib/db'; // adjust path if needed
import type { RowDataPacket, OkPacket } from 'mysql2';

interface CompanyFormRow extends RowDataPacket {
  id: number;
  user_id: string;
  companyName: string;
  tenderStartDate: string;
  tenderEndDate: string;
  companyNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
  tenderWorth: number;
  margin: number;
  gstNumber: string;
  supplyTo: string;
  stateGovernment: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const [rows] = await db.query<CompanyFormRow[]>(
        `SELECT * FROM companydb WHERE user_id = ? ORDER BY id DESC`,
        [userId]
      );

      // Return array even if empty
      return res.status(200).json({ forms: rows });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch form data' });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        companyName,
        tenderStartDate,
        tenderEndDate,
        companyNumber,
        email,
        phoneNumber,
        address,
        tenderWorth,
        margin,
        gstNumber,
        supplyTo,
        stateGovernment,
      } = req.body;

      await db.query<OkPacket>(
        `INSERT INTO companydb (
          user_id, companyName, tenderStartDate, tenderEndDate, companyNumber,
          email, phoneNumber, address, tenderWorth, margin,
          gstNumber, supplyTo, stateGovernment
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          companyName,
          tenderStartDate,
          tenderEndDate,
          companyNumber,
          email,
          phoneNumber,
          address,
          tenderWorth,
          margin,
          gstNumber,
          supplyTo,
          stateGovernment,
        ]
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to save form data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
