import React, { useState } from 'react';
import PaymentMethodSelection from './payment-method-selection/components/PaymentMethodSelection';
import PaymentMethodDetails from './payment-method-selection/components/PaymentMethodDetails';
import { paymentMethodSelectionApi } from './payment-method-selection/api/paymentMethodSelection.api';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);

  const handleSubmit = async (details) => {
    try {
      await paymentMethodSelectionApi.submitPaymentMethod(details);
      setStep(3);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded my-8">
      {step === 1 && <PaymentMethodSelection onNext={handleNext} />}
      {step === 2 && <PaymentMethodDetails onSubmit={handleSubmit} />}
      {step === 3 && <div className="p-4 text-center text-green-600">Payment details saved!</div>}
    </div>
    
  );
}

export default App;
