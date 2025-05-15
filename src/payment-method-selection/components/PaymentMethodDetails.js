import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedPaymentMethodAtom, paymentDetailsAtom } from '../store/paymentMethodSelection.atoms';
import { validatePaymentDetails } from '../types/paymentMethodSelection.types';

export default function PaymentMethodDetails({ onSubmit }) {
  const [selected] = useAtom(selectedPaymentMethodAtom);
  const [details, setDetails] = useAtom(paymentDetailsAtom);
  const [error, setError] = useState('');

  const handleChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const err = validatePaymentDetails(selected.id, details);
    if (err) setError(err);
    else {
      setError('');
      onSubmit({ ...details, type: selected.id });
    }
  };

  if (!selected) return null;

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-2">{selected.name} Information</h3>
      {selected.id === 'card' && (
        <>
          <input name="cardNumber" placeholder="Card Number" className="border p-2 w-full mb-2" onChange={handleChange} />
          <input name="expiry" placeholder="Expiry Date" className="border p-2 w-full mb-2" onChange={handleChange} />
          <input name="cvv" placeholder="CVV" className="border p-2 w-full mb-2" onChange={handleChange} />
        </>
      )}
      {selected.id === 'bank' && (
        <>
          <input name="iban" placeholder="IBAN" className="border p-2 w-full mb-2" onChange={handleChange} />
        </>
      )}
      {selected.id === 'mobile' && (
        <>
          <input name="mobileNumber" placeholder="Mobile Number" className="border p-2 w-full mb-2" onChange={handleChange} />
        </>
      )}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={handleSubmit}>Next</button>
    </div>
  );
}
