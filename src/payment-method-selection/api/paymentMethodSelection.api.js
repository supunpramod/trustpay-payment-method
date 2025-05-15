const MOCK_PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
  { id: 'mobile', name: 'Mobile Money', icon: '📱' }
];

export const paymentMethodSelectionApi = {
  getPaymentMethods: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_PAYMENT_METHODS;
  },
  submitPaymentMethod: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!data.type) {
      throw new Error('Payment method is required');
    }
    return {
      success: true,
      message: 'Payment method saved'
    };
  }
};
