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
      ? 'font-semibold text-green-600 border-b-2 border-green-500'
      : 'text-gray-500 hover:text-green-500';

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
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden font-poppins border border-gray-200 flex flex-col mt-20 ">
      {/* Header */}
      <div className="bg-green-500 text-white p-5 text-center">
        <h1 className="text-2xl font-bold">TrustPay</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex text-sm border-b border-gray-200 bg-gray-50">
        {steps.map(tab => (
          <button
            key={tab}
            className={`flex-1 py-3 px-2 text-center transition ${isActive(tab)}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="p-6">
        {activeTab === 'transaction-type' && (
          <div className="space-y-4">
            <App />
          </div>
        )}

        {activeTab === 'product-details' && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md text-sm focus:ring-2 focus:ring-green-300 focus:outline-none"
                placeholder="e.g. iPhone 13 Pro 256GB Graphite - Excellent condition"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
              <textarea
                className="w-full p-3 border rounded-md text-sm focus:ring-2 focus:ring-green-300 focus:outline-none"
                placeholder="e.g. Used for 1 year, battery health 89%..."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (optional)</label>
              <div className="flex flex-wrap gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative h-20 w-20 border rounded overflow-hidden">
                    <img src={img.preview} alt={`Product ${index}`} className="h-full w-full object-cover" />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs shadow"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed rounded-md flex items-center justify-center h-20 w-20 cursor-pointer hover:bg-gray-100">
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none"
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input type="text" className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none" placeholder="e.g. Supun Perera" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="text" className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none" placeholder="e.g. 0771234567" />
            </div>
          </div>
        )}

        {activeTab === 'share-link' && (
          <div className="space-y-4 text-sm">
            <p className="text-gray-700">Complete your transaction and share the link:</p>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="mb-2 text-gray-800">Link:</p>
              <div className="flex items-center gap-2">
                <input type="text" readOnly className="flex-1 border p-2 rounded-md bg-white" value="https://trustpay.lk/deal/xyz123" />
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-xs">Copy</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 flex gap-3 bg-gray-50 border-t border-gray-200">
        <button
          onClick={goToPrevious}
          className={`flex-1 py-3 rounded-full transition ${currentIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          disabled={currentIndex === 0}
        >
          Back
        </button>
        <button
          onClick={goToNext}
          className={`flex-1 py-3 rounded-full transition ${currentIndex === steps.length - 1 ? 'bg-green-300 text-white cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
          disabled={currentIndex === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TrustPayForm;