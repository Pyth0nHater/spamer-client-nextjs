'use client';

import React, { useEffect, useState } from 'react';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

const API_ID = 25171031;
const API_HASH = '10f7696a65a7217fad43302ea6ba1695';
const SESSION = new StringSession('');

const SessionsPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState<string>('');
  const [client, setClient] = useState<TelegramClient | null>(null);
  const [session, setSession] = useState<any>('');
  const [activeTab, setActiveTab] = useState<string>('sessions');

  useEffect(() => {
    const initializeClient = async () => {
      const newClient = new TelegramClient(SESSION, API_ID, API_HASH, { connectionRetries: 5 });
      try {
        await newClient.connect();
        setClient(newClient);
      } catch (error) {
        console.error('Failed to initialize client:', error);
      }
    };

    initializeClient();
  }, []);

  const sendCodeHandler = async () => {
    if (client) {
      try {
        await client.sendCode(
          {
            apiId: API_ID,
            apiHash: API_HASH,
          },
          phoneNumber
        );
        alert('Code sent!');
      } catch (error) {
        console.error('Error sending code:', error);
      }
    }
  };

  const clientStartHandler = async () => {
    if (client) {
      try {
        await client.start({
          phoneNumber: async () => phoneNumber,
          password: async () => password,
          phoneCode: async () => phoneCode,
          onError: (err) => console.error('Error during login:', err),
        });
        await client.sendMessage('me', { message: "You're successfully logged in!" });
        const savedSession = client.session.save();
        setSession(savedSession);
        alert("You're successfully logged in!");
        console.log('Session saved:', savedSession);
      } catch (error) {
        console.error('Error starting client:', error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'phoneCode':
        setPhoneCode(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 mb-4 mt-2">
        <nav className="flex space-x-4 justify-center">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'sessions' ? 'text-white border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            My
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'login' ? 'text-white border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            Add
          </button>
        </nav>
      </div>

      {activeTab === 'login' && (
        <div className="h-screen flex ml-5 mr-5 mt-5 justify-center">
        <div className="w-full max-w-md text-center">
          <label htmlFor="price" className="block text-base/10 font-medium text-white text-left mb-1">
            Phone
          </label>
          {/* Поле для ввода телефона */}
          <input
            autoComplete="given-name"
            className="bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm mb-2"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChange}
          />
          <label htmlFor="price" className="block text-base/10 font-medium text-white text-left mb-1">
            Password
          </label>
          {/* Поле для ввода пароля */}
          <input
            type="password"
            name="password"
            className="bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm mb-4"
            value={password}
            onChange={handleInputChange}
          />
          
          <div className="text-right">
            <input
              type="button"
              value="Send code"
              onClick={sendCodeHandler}
              className="font-medium bg-gray-200 px-3 py-1 rounded-md cursor-pointer"
            />
          </div>
          
          <label htmlFor="price" className="block text-base/10 font-medium text-white text-left mb-1">
            Code
          </label>
          <input
            className="bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm mb-4"
            type="text"
            name="phoneCode"
            value={phoneCode}
            onChange={handleInputChange}
          />
          
          {/* Кнопка "Start Client" */}
          <div className="text-right">
            <input
              type="button"
              value="Add session"
              onClick={clientStartHandler}
              className="font-medium bg-gray-200 px-3 py-1 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      )}

      {activeTab === 'sessions' && (
        <div>
          {true ? (
            <div className="h-screen flex ml-5 mr-5 mt-5 justify-center">
              <div className="w-full max-w-md text-center">
                    <div className="flex justify-between max-w-md items-center ml-5 mr-5 mt-5 bg-gray-200 text-black px-3 p-2 rounded-md shadow-md">
                      <span className="font-medium">My acc</span>
                      <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      </button>
                    </div>
                    
                </div>
              </div>      
          ) : (
            <p className="text-gray-400 text-xl/2 mt-40 text-center font-medium flex items-center justify-center">
              No session available. Log in to see details.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default SessionsPage;
