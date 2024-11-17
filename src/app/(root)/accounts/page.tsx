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
      <div className="border-gray-200 mb-4 mt-2">
        <nav className="flex space-x-4 justify-center">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'sessions' ? 'text-white border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            Мои
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'login' ? 'text-white border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            Добавить
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                       <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
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
