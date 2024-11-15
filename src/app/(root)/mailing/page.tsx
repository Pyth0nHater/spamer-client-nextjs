'use client';

import React, { useState } from 'react';

const SessionsPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="h-screen flex ml-5 mr-5 mt-5 justify-center">
        <div className="w-full max-w-md text-center">
          <label htmlFor="phoneNumber" className="block text-base/10 font-medium text-white text-left mb-1">
            Phone
          </label>
          {/* Поле для ввода телефона */}
          <input
            autoComplete="given-name"
            className="bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm mb-2"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange} // Добавлен onChange
          />
          
          <label htmlFor="password" className="block text-base/10 font-medium text-white text-left mb-1">
            Password
          </label>
          {/* Поле для ввода пароля */}
          <input
            type="password"
            name="password"
            className="bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm mb-4"
            value={password}
            onChange={handlePasswordChange} // Добавлен onChange
          />
          
          <div className="text-right">
            <input
              type="button"
              value="Send code"
              className="font-medium bg-gray-200 px-3 py-1 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionsPage;
