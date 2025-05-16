import React, { useState } from 'react';
import App from './App'; // Assuming App is the component for transaction type selection

const TrustPayForm = () => {
  const steps = ['transaction-type', 'product-details', 'your-details', 'share-link'];
  const [activeTab, setActiveTab] = useState('transaction-type');
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    if (e.target.files?.length) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const isActive = (tab) =>
    activeTab === tab
      ? 'font-medium text-black border-b-2 border-green-500'
      : 'text-gray-700';

  const currentIndex = steps.indexOf(activeTab);
  const goToNext = () => {
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1]);
    }
  };
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md font-poppins">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">TrustPay</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex text-xs border-b">
        {steps.map(tab => (
          <button
            key={tab}
            className={`flex-1 py-2 px-1 text-center ${isActive(tab)}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab
              .replace('transaction-type', 'Transaction Type')
              .replace('product-details', 'Product Details')
              .replace('your-details', 'Your Details')
              .replace('share-link', 'Share Link')}
          </button>
        ))}
      </div>

      {/* Step content */}
      {activeTab === 'transaction-type' && (
        <div className="p-6 space-y-4">
          <App />
        </div>
      )}

      {activeTab === 'product-details' && (
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Product Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm text-gray-700"
              placeholder="e.g. iPhone 13 Pro 256GB Graphite - Excellent condition"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Description</label>
            <textarea
              className="w-full p-2 border rounded text-sm text-gray-700"
              placeholder="e.g. Used for 1 year, battery health 89%..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Images (optional)</label>
            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative h-16 w-16 border rounded overflow-hidden">
                  <img src={img.preview} alt={`Product ${index}`} className="h-full w-full object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="border border-dashed rounded flex items-center justify-center h-16 w-16 cursor-pointer">
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pl-10 border rounded"
                placeholder="48000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Rs.</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'your-details' && (
        <div className="p-6 space-y-4">
          <p className="text-sm">Enter your details:</p>
          <div>
            <label className="block text-sm mb-1">Your Name</label>
            <input type="text" className="w-full border p-2 rounded" placeholder="e.g. Supun Perera" />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input type="text" className="w-full border p-2 rounded" placeholder="e.g. 0771234567" />
          </div>
        </div>
      )}

      {activeTab === 'share-link' && (
        <div className="p-6 space-y-4 text-sm">
          <p>Complete your transaction and share the link:</p>
          <div className="bg-gray-100 p-3 rounded">
            <p className="mb-2">Link:</p>
            <div className="flex items-center gap-2">
              <input type="text" readOnly className="flex-1 border p-2 rounded" value="https://trustpay.lk/deal/xyz123" />
              <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">Copy</button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="p-4 flex gap-3">
        <button
          onClick={goToPrevious}
          className={`flex-1 py-3 ${currentIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-800'} rounded-full`}
          disabled={currentIndex === 0}
        >
          Back
        </button>
        <button
          onClick={goToNext}
          className={`flex-1 py-3 ${currentIndex === steps.length - 1 ? 'bg-green-300 cursor-not-allowed' : 'bg-green-400'} text-white rounded-full`}
          disabled={currentIndex === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TrustPayForm;
