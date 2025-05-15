import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { selectedPaymentMethodAtom } from '../store/paymentMethodSelection.atoms';
import { paymentMethodSelectionApi } from '../api/paymentMethodSelection.api';

export default function PaymentMethodSelection({ onNext }) {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useAtom(selectedPaymentMethodAtom);

  useEffect(() => {
    paymentMethodSelectionApi.getPaymentMethods().then(res => {
      setMethods(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Select payment methods</h2>
      <div className="flex flex-col gap-3">
        {methods.map(m => (
          <button
            key={m.id}
            className={`flex items-center gap-2 p-3 border rounded ${selected?.id === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setSelected(m)}
          >
            <span>{m.icon}</span>
            <span>{m.name}</span>
          </button>
        ))}
      </div>
      {selected && (
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
}
