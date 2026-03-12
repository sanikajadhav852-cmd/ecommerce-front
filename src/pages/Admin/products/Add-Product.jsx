import React, { useState } from 'react';
import { Upload, X, ChevronDown, Save, RotateCcw } from 'lucide-react';

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    identification: '',
    madeIn: '',
    brand: '',
    tags: '',
    type: 'Physical Product',
    shortDescription: '',
    tax: [],
    taxIncluded: false,
    videoType: 'None',
    indicator: 'None',
    totalAllowedQuantity: 1,
    minOrderQuantity: 1,
    warranty: '',
    guarantee: '',
    stepSize: 1,
    description: ''
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#4e5e7a]">Add Product</h2>
        <p className="text-sm text-gray-500">
          Home / <span className="text-purple-600">Add Product</span>
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Main Info */}
          <div className="lg:col-span-8 space-y-6">
            {/* Product Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-[#4e5e7a]">Product Information</h3>
                <button type="button" className="text-gray-400 hover:text-red-500"><X size={20} /></button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Name" required placeholder="Product Name" />
                <InputField label="Identification of Product" placeholder="Product Identification Number" />
                <SelectField label="Made In" options={['Search for countries']} />
                <SelectField label="Brand" options={['Search for brands']} />
                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Tags (These tags help you in search result)</label>
                  <input type="text" placeholder="Enter product tags" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <InputField label="Product Type" value="Physical Product" readOnly />
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Short Description <span className="text-red-500">*</span></label>
                  <textarea rows="3" placeholder="Product Short Description" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500"></textarea>
                </div>
              </div>
            </div>

            {/* Product Tax & Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[#4e5e7a] mb-4 border-b pb-2">Product Tax</h3>
                <div className="space-y-4">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Tax</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-2 bg-gray-50">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <X size={12} /> No Taxes Are Added
                    </span>
                    <input type="text" className="bg-transparent outline-none text-sm flex-1" />
                    <X size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Tax Included in prices?</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[#4e5e7a] mb-4 border-b pb-2">Product Video Type</h3>
                <SelectField label="Video Type" options={['None', 'Youtube', 'Vimeo', 'Self Hosted']} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Categories */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
              <div className="p-4 border-b bg-gray-50/50">
                <h3 className="font-bold text-[#4e5e7a]">Categories</h3>
              </div>
              <div className="p-6">
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-4">Select Category <span className="text-red-500">*</span></label>
                <div className="space-y-3 border border-gray-100 p-4 rounded-lg bg-gray-50/30">
                  <CategoryItem label="Ready Mix Masala" />
                  <CategoryItem label="Khada Masala" />
                  <CategoryItem label="Spices Powders" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-[#4e5e7a] mb-6 border-b pb-2">Product Images</h3>
          <div className="space-y-6">
            <ImageUploadBox label="Main Image" recommended="180 x 180 pixels" />
            <ImageUploadBox label="Other Images" recommended="180 x 180 pixels" />
          </div>
        </div>

        {/* Product Quantity & Other */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-[#4e5e7a] mb-6 border-b pb-2">Product Quantity & Other</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField label="Indicator" options={['None', 'Veg', 'Non-Veg']} />
            <InputField label="Total Allowed Quantity" type="number" value="1" />
            <InputField label="Minimum Order Quantity" type="number" value="1" />
            <InputField label="Warranty Period" placeholder="Warranty Period if any" />
            <InputField label="Guarantee Period" placeholder="Guarantee Period if any" />
            <InputField label="Quantity Step Size" type="number" value="1" />
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b bg-gray-50/50">
            <h3 className="font-bold text-[#4e5e7a]">Description</h3>
          </div>
          <div className="p-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Mock Toolbar to match TinyMCE/Editor look in image */}
              <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-4 text-gray-500 border-gray-200">
                <span className="text-xs border-r pr-4">File Edit View Insert Format</span>
                <span className="text-xs">Paragraph</span>
                <span className="text-xs">12pt</span>
              </div>
              <textarea 
                rows="10" 
                placeholder="Place some text here"
                className="w-full p-4 outline-none text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="reset" className="bg-[#ffc107] text-white px-8 py-2.5 rounded-lg font-bold shadow-md hover:bg-[#e0a800] transition-colors flex items-center gap-2">
            <RotateCcw size={18} /> Reset
          </button>
          <button type="submit" className="bg-[#71dd37] text-white px-8 py-2.5 rounded-lg font-bold shadow-md hover:bg-[#61be2f] transition-colors flex items-center gap-2">
            <Save size={18} /> Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

/* Internal Sub-components for cleaner code */

function InputField({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500"
        {...props} 
      />
    </div>
  );
}

function SelectField({ label, options }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">{label}</label>
      <div className="relative">
        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500 appearance-none bg-white">
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function CategoryItem({ label }) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
      <span className="text-sm text-gray-600 flex items-center gap-2">
        📂 {label}
      </span>
    </div>
  );
}

function ImageUploadBox({ label, recommended }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-gray-500 uppercase">{label}</label>
      <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50/20 hover:bg-blue-50/50 transition-colors cursor-pointer group">
        <div className="bg-white p-4 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
          <Upload size={32} className="text-gray-400" />
        </div>
        <p className="mt-4 text-sm text-gray-600">Drop your image here, or <span className="text-blue-500 font-medium">browse</span></p>
        <p className="text-[10px] text-gray-400 mt-1">Recommended Size : {recommended}</p>
      </div>
    </div>
  );
}

function Switch() {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
    </label>
  );
}