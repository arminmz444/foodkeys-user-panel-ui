import React from 'react';

// Custom switch component that matches the design in the image
interface CustomSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export default function CustomSwitch({ 
  checked, 
  onChange, 
  label, 
  description 
}: CustomSwitchProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex flex-row items-center gap-3">
        {label && <span className="font-medium text-gray-800">{label}</span>}
        {description && <span className="text-sm text-gray-500">{description}</span>}
      </div>
      <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 bg-gray-200">
        <input 
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={onChange}
        />
        <span 
          className={`${
            checked ? 'translate-x-5 bg-primary-500' : 'translate-x-0 bg-white'
          } inline-block h-5 w-5 transform rounded-full border border-gray-200 shadow-sm ring-0 transition-transform`}
        />
        <span 
          className={`${
            checked ? 'bg-primary-500' : 'bg-gray-200'
          } absolute inset-0 rounded-full transition-colors`}
        />
      </div>
    </div>
  );
}