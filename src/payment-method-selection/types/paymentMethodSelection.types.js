// Simple validation function (TypeScript නැතුව JS)
export const validatePaymentDetails = (type, details) => {
  if (type === 'card') {
    if (!details.cardNumber) return 'Card number is required';
    if (!details.expiry) return 'Expiry date is required';
    if (!details.cvv) return 'CVV is required';
  }
  if (type === 'bank') {
    if (!details.iban) return 'IBAN is required';
  }
  if (type === 'mobile') {
    if (!details.mobileNumber) return 'Mobile number is required';
  }
  return null;
};
