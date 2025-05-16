import React, { useState } from 'react';

const TrustPayForm = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  
  const handleImageUpload = (e) => {
    if (e.target.files?.length) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages([...images, ...newImages]);
    }
  };
  
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">TrustPay</h1>
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex text-xs text-gray-700 border-b">
        <div className="flex-1 py-2 px-1 text-center">Transaction Type</div>
        <div className="flex-1 py-2 px-1 text-center font-medium">Product Details</div>
        <div className="flex-1 py-2 px-1 text-center">Your Details</div>
        <div className="flex-1 py-2 px-1 text-center">Share Link</div>
      </div>
      
      {/* Form Content */}
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
            placeholder="e.g. Used for 1 year, battery health 89%. Includes original charger and box. Minor scratches on the frame."
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
      
      {/* Navigation Buttons */}
      <div className="p-4 flex gap-3">
        <button className="flex-1 py-3 bg-gray-100 rounded-full text-gray-800">Back</button>
        <button className="flex-1 py-3 bg-green-400 rounded-full text-white">Next</button>
      </div>
    </div>
  );
};

export default TrustPayForm;
