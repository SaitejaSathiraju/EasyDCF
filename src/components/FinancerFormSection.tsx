import React from "react";

type FormData = {
  financerName: string;
  financerType: string;
  rbiRegNumber: string;
  officeAddress: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  website: string;

  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmount: string;
  currency: string;
  invoiceDueDate: string;
  msmeName: string;
  msmeUdyam: string;
  buyerName: string;
  buyerGSTIN: string;
  goodsDescription: string;

  discountRate: string;
  tenureDays: string;
  discountAmount: string;
  netPayable: string;
  settlementDate: string;
  earlyPayment: boolean;
  partialFinancing: boolean;

  creditRating: string;
  pastDealings: string;
  previousTransactions: string;
  kycDone: boolean;

  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  branchAddress: string;
  upiId: string;

  declarationAgreed: boolean;

  authorizedSignatory: string;
  signatoryDesignation: string;
  signatureDate: string;
};
const FinancerFormSection = ({
  allForms = [],  // default to empty array if undefined
  formData,
  handleChange,
}: {
  allForms?: FormData[];
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}) => {
  return (
    <>
    
      {/* Financer Details */}
      <label className="block">
        <span className="text-black font-semibold mb-1 block">Financer Name</span>
        <input
          name="financerName"
          value={formData.financerName}
          onChange={handleChange}
          required
          placeholder="Enter financer name"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Financer Type</span>
        <select
          name="financerType"
          value={formData.financerType}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-orange-600 px-4 py-3 bg-white text-black"
        >
          <option value="">Select financer type</option>
          <option value="Bank">Bank</option>
          <option value="NBFC">NBFC</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">RBI Registration Number</span>
        <input
          name="rbiRegNumber"
          value={formData.rbiRegNumber}
          onChange={handleChange}
          placeholder="Enter RBI registration number"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Registered Office Address</span>
        <textarea
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          rows={3}
          placeholder="Enter registered office address"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 resize-none text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Contact Person Name</span>
        <input
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="Enter contact person name"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Designation</span>
        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Enter designation"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Contact Number</span>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+91 9876543210"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Official Website</span>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      {/* Invoice Details */}
      <label className="block">
        <span className="text-black font-semibold mb-1 block">Invoice Number</span>
        <input
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          placeholder="Enter invoice number"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Invoice Date</span>
        <input
          type="date"
          name="invoiceDate"
          value={formData.invoiceDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Invoice Amount (₹)</span>
        <input
          type="number"
          name="invoiceAmount"
          value={formData.invoiceAmount}
          onChange={handleChange}
          placeholder="Enter invoice amount"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
          min={0}
          step="0.01"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Currency</span>
        <input
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          placeholder="INR"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Invoice Due Date</span>
        <input
          type="date"
          name="invoiceDueDate"
          value={formData.invoiceDueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">MSME Name</span>
        <input
          name="msmeName"
          value={formData.msmeName}
          onChange={handleChange}
          placeholder="Enter MSME name"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">MSME UDYAM Registration Number</span>
        <input
          name="msmeUdyam"
          value={formData.msmeUdyam}
          onChange={handleChange}
          placeholder="Enter UDYAM number"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Buyer Name</span>
        <input
          name="buyerName"
          value={formData.buyerName}
          onChange={handleChange}
          placeholder="Enter buyer name"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Buyer GSTIN</span>
        <input
          name="buyerGSTIN"
          value={formData.buyerGSTIN}
          onChange={handleChange}
          placeholder="Enter GSTIN"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Description of Goods/Services</span>
        <textarea
          name="goodsDescription"
          value={formData.goodsDescription}
          onChange={handleChange}
          rows={3}
          placeholder="Describe goods or services"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 resize-none text-black placeholder-orange-300"
        />
      </label>

      {/* Financing Offer Details */}
      <label className="block">
        <span className="text-black font-semibold mb-1 block">Discount Rate (%)</span>
        <input
          type="number"
          name="discountRate"
          value={formData.discountRate}
          onChange={handleChange}
          placeholder="Enter discount rate"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
          min={0}
          step="0.01"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Tenure (Days)</span>
        <input
          type="number"
          name="tenureDays"
          value={formData.tenureDays}
          onChange={handleChange}
          placeholder="Enter tenure in days"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
          min={1}
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Discount Amount (₹)</span>
        <input
          type="number"
          name="discountAmount"
          value={formData.discountAmount}
          onChange={handleChange}
          placeholder="Calculated discount amount"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
          min={0}
          step="0.01"
          readOnly
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Net Payable (₹)</span>
        <input
          type="number"
          name="netPayable"
          value={formData.netPayable}
          onChange={handleChange}
          placeholder="Net amount payable"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
          min={0}
          step="0.01"
          readOnly
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Settlement Date</span>
        <input
          type="date"
          name="settlementDate"
          value={formData.settlementDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black"
        />
      </label>

      <label className="inline-flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          name="earlyPayment"
          checked={formData.earlyPayment}
          onChange={handleChange}
          className="form-checkbox text-orange-600"
        />
        <span className="text-black font-semibold">Early Payment Option Available</span>
      </label>

      <label className="inline-flex items-center space-x-2 mt-2 mb-6">
        <input
          type="checkbox"
          name="partialFinancing"
          checked={formData.partialFinancing}
          onChange={handleChange}
          className="form-checkbox text-orange-600"
        />
        <span className="text-black font-semibold">Partial Financing Allowed</span>
      </label>

      {/* Credit & Compliance */}
      <label className="block">
        <span className="text-black font-semibold mb-1 block">Credit Rating / Score</span>
        <input
          name="creditRating"
          value={formData.creditRating}
          onChange={handleChange}
          placeholder="Enter credit rating or score"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Past Dealings with MSME</span>
        <textarea
          name="pastDealings"
          value={formData.pastDealings}
          onChange={handleChange}
          rows={3}
          placeholder="Describe past dealings"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 resize-none text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Previous Transactions on TReDS</span>
        <textarea
          name="previousTransactions"
          value={formData.previousTransactions}
          onChange={handleChange}
          rows={3}
          placeholder="Details of previous transactions"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 resize-none text-black placeholder-orange-300"
        />
      </label>

      <label className="inline-flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          name="kycDone"
          checked={formData.kycDone}
          onChange={handleChange}
          className="form-checkbox text-orange-600"
        />
        <span className="text-black font-semibold">KYC & AML Compliance Completed</span>
      </label>

      {/* Payment Details */}
      <label className="block">
        <span className="text-black font-semibold mb-1 block">Bank Name</span>
        <input
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          placeholder="Enter bank name"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Account Holder Name</span>
        <input
          name="accountHolder"
          value={formData.accountHolder}
          onChange={handleChange}
          placeholder="Enter account holder name"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Account Number</span>
        <input
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Enter account number"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">IFSC Code</span>
        <input
          name="ifsc"
          value={formData.ifsc}
          onChange={handleChange}
          placeholder="Enter IFSC code"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Branch Address</span>
        <textarea
          name="branchAddress"
          value={formData.branchAddress}
          onChange={handleChange}
          rows={2}
          placeholder="Enter branch address"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 resize-none text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">UPI ID (optional)</span>
        <input
          name="upiId"
          value={formData.upiId}
          onChange={handleChange}
          placeholder="Enter UPI ID"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      {/* Declaration */}
      <label className="inline-flex items-center space-x-2 mt-4 mb-6">
        <input
          type="checkbox"
          name="declarationAgreed"
          checked={formData.declarationAgreed}
          onChange={handleChange}
          required
          className="form-checkbox text-orange-600"
        />
        <span className="text-black font-semibold">
          I declare that all information provided is true and I agree to the terms of the TReDS platform.
        </span>
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Authorized Signatory Name</span>
        <input
          name="authorizedSignatory"
          value={formData.authorizedSignatory}
          onChange={handleChange}
          required
          placeholder="Enter authorized signatory name"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Designation</span>
        <input
          name="signatoryDesignation"
          value={formData.signatoryDesignation}
          onChange={handleChange}
          required
          placeholder="Enter designation"
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
        />
      </label>

      <label className="block">
        <span className="text-black font-semibold mb-1 block">Date</span>
        <input
          type="date"
          name="signatureDate"
          value={formData.signatureDate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black"
        />
      </label>
      

  <div>
      {allForms.length === 0 ? (
        <p className="text-black text-center italic">No previous submissions found.</p>
      ) : (
        <div className="space-y-6">
          {allForms.map((form, idx) => (
            <div
              key={form.invoiceNumber || idx}
              className="p-6 border-2 border-orange-600 rounded-xl bg-orange-50 shadow-md text-black"
            >
              <h1 className="text-3xl text-bold flex justify-center text-orange-400">Previous submissions</h1>
              <p><strong>Financer Name:</strong> {form.financerName || '-'}</p>
              <p><strong>Financer Type:</strong> {form.financerType || '-'}</p>
              <p><strong>RBI Reg Number:</strong> {form.rbiRegNumber || '-'}</p>
              <p><strong>Office Address:</strong> {form.officeAddress || '-'}</p>
              <p><strong>Contact Name:</strong> {form.contactName || '-'}</p>
              <p><strong>Designation:</strong> {form.designation || '-'}</p>
              <p><strong>Email:</strong> {form.email || '-'}</p>
              <p><strong>Phone:</strong> {form.phone || '-'}</p>
              <p><strong>Website:</strong> {form.website || '-'}</p>
              <hr className="my-2" />
              <p><strong>Invoice Number:</strong> {form.invoiceNumber || '-'}</p>
              <p><strong>Invoice Date:</strong> {form.invoiceDate ? new Date(form.invoiceDate).toLocaleDateString() : '-'}</p>
              <p><strong>Invoice Amount:</strong> ₹{form.invoiceAmount || '-'}</p>
              <p><strong>Currency:</strong> {form.currency || '-'}</p>
              <p><strong>Invoice Due Date:</strong> {form.invoiceDueDate ? new Date(form.invoiceDueDate).toLocaleDateString() : '-'}</p>
              <hr className="my-2" />
              <p><strong>MSME Name:</strong> {form.msmeName || '-'}</p>
              <p><strong>UDYAM Number:</strong> {form.msmeUdyam || '-'}</p>
              <p><strong>Buyer Name:</strong> {form.buyerName || '-'}</p>
              <p><strong>Buyer GSTIN:</strong> {form.buyerGSTIN || '-'}</p>
              <p><strong>Description:</strong> {form.goodsDescription || '-'}</p>
              <hr className="my-2" />
              <p><strong>Discount Rate:</strong> {form.discountRate || '-'}%</p>
              <p><strong>Tenure:</strong> {form.tenureDays || '-'} days</p>
              <p><strong>Discount Amount:</strong> ₹{form.discountAmount || '-'}</p>
              <p><strong>Net Payable:</strong> ₹{form.netPayable || '-'}</p>
              <p><strong>Settlement Date:</strong> {form.settlementDate ? new Date(form.settlementDate).toLocaleDateString() : '-'}</p>
              <p><strong>Early Payment:</strong> {form.earlyPayment ? 'Yes' : 'No'}</p>
              <p><strong>Partial Financing:</strong> {form.partialFinancing ? 'Yes' : 'No'}</p>
              <hr className="my-2" />
              <p><strong>Credit Rating:</strong> {form.creditRating || '-'}</p>
              <p><strong>Past Dealings:</strong> {form.pastDealings || '-'}</p>
              <p><strong>Previous Transactions:</strong> {form.previousTransactions || '-'}</p>
              <p><strong>KYC Done:</strong> {form.kycDone ? 'Yes' : 'No'}</p>
              <hr className="my-2" />
              <p><strong>Bank Name:</strong> {form.bankName || '-'}</p>
              <p><strong>Account Holder:</strong> {form.accountHolder || '-'}</p>
              <p><strong>Account Number:</strong> {form.accountNumber || '-'}</p>
              <p><strong>IFSC:</strong> {form.ifsc || '-'}</p>
              <p><strong>Branch Address:</strong> {form.branchAddress || '-'}</p>
              <p><strong>UPI ID:</strong> {form.upiId || '-'}</p>
              <hr className="my-2" />
              <p><strong>Declaration Agreed:</strong> {form.declarationAgreed ? 'Yes' : 'No'}</p>
              <p><strong>Authorized Signatory:</strong> {form.authorizedSignatory || '-'}</p>
              <p><strong>Signatory Designation:</strong> {form.signatoryDesignation || '-'}</p>
              <p><strong>Signature Date:</strong> {form.signatureDate ? new Date(form.signatureDate).toLocaleDateString() : '-'}</p>
            </div>
          ))}
        </div>
      )} 
    </div>
  </>
  );
};

export default FinancerFormSection;
