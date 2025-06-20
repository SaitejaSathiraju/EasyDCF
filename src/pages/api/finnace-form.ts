// src/pages/api/finnace-form.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

// Utility function to convert snake_case keys to camelCase
function toCamelCase(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = obj[key];
    }
  }
  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('form_data')
        .select('*')
        .eq('user_id', userId)
        .order('id', { ascending: false });

      if (error) {
        console.error('GET error:', error);
        return res.status(500).json({ error: 'Failed to fetch data', details: error });
      }

      // Convert each row keys to camelCase
      const camelCaseData = data?.map(row => toCamelCase(row)) || [];

      return res.status(200).json({ forms: camelCaseData });
    } catch (err) {
      console.error('GET exception:', err);
      return res.status(500).json({ error: 'Exception fetching data', details: err });
    }
  }

  if (req.method === 'POST') {
    try {
      // Destructure expected fields from req.body
      const {
        financer_name,
        financer_type,
        rbi_reg_number,
        office_address,
        contact_name,
        designation,
        email,
        phone,
        website,

        invoice_number,
        invoice_date,
        invoice_amount,
        currency,
        invoice_due_date,
        msme_name,
        msme_udyam,
        buyer_name,
        buyer_gstin,
        goods_description,

        discount_rate,
        tenure_days,
        discount_amount,
        net_payable,
        settlement_date,
        early_payment,
        partial_financing,

        credit_rating,
        past_dealings,
        previous_transactions,
        kyc_done,

        bank_name,
        account_holder,
        account_number,
        ifsc,
        branch_address,
        upi_id,

        declaration_agreed,

        authorized_signatory,
        signatory_designation,
        signature_date,
      } = req.body;

      const sanitize = (value: unknown): unknown => {
        if (typeof value === 'string' && value.trim() === '') {
          return null;
        }
        return value;
      };

      const formData = {
        user_id: userId,

        financer_name: sanitize(financer_name),
        financer_type: sanitize(financer_type),
        rbi_reg_number: sanitize(rbi_reg_number),
        office_address: sanitize(office_address),
        contact_name: sanitize(contact_name),
        designation: sanitize(designation),
        email: sanitize(email),
        phone: sanitize(phone),
        website: sanitize(website),

        invoice_number: sanitize(invoice_number),
        invoice_date: sanitize(invoice_date),
        invoice_amount: sanitize(invoice_amount),
        currency: sanitize(currency),
        invoice_due_date: sanitize(invoice_due_date),
        msme_name: sanitize(msme_name),
        msme_udyam: sanitize(msme_udyam),
        buyer_name: sanitize(buyer_name),
        buyer_gstin: buyer_gstin === undefined || buyer_gstin === null ? '' : sanitize(buyer_gstin),
        goods_description: sanitize(goods_description),

        discount_rate: sanitize(discount_rate),
        tenure_days: sanitize(tenure_days),
        discount_amount: sanitize(discount_amount),
        net_payable: sanitize(net_payable),
        settlement_date: sanitize(settlement_date),
        early_payment: sanitize(early_payment),
        partial_financing: sanitize(partial_financing),

        credit_rating: sanitize(credit_rating),
        past_dealings: sanitize(past_dealings),
        previous_transactions: sanitize(previous_transactions),
        kyc_done: sanitize(kyc_done),

        bank_name: sanitize(bank_name),
        account_holder: sanitize(account_holder),
        account_number: sanitize(account_number),
        ifsc: sanitize(ifsc),
        branch_address: sanitize(branch_address),
        upi_id: sanitize(upi_id),

        declaration_agreed: sanitize(declaration_agreed),

        authorized_signatory: sanitize(authorized_signatory),
        signatory_designation: sanitize(signatory_designation),
        signature_date: sanitize(signature_date),
      };

      const { error } = await supabase.from('form_data').insert([formData]);

      if (error) {
        console.error('POST error:', error);
        console.error('Received form data:', formData);
        return res.status(500).json({ error: 'Failed to save form data', details: error });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('POST exception:', err);
      return res.status(500).json({ error: 'Exception saving form data', details: err });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
