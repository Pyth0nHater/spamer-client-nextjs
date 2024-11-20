'use client';

import React, { useState } from 'react';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Selector from '@/app/components/Selector/Selector';
import axios from 'axios';

// Replace these with your actual API credentials
const apiId = 25171031; // Your API ID
const apiHash = '10f7696a65a7217fad43302ea6ba1695'; // Your API Hash

interface Account {
  id: number;
  name: string;
  session: string;
}

interface Folder {
  id: number;
  title: string;
  users: Api.TypeInputPeer[]; 
}

const accounts: Account[] = [
  {
    id: 1,
    name: 'My Account',
    session: '1AgAOMTQ5LjE1NC4xNjcuNDEBu6U9xXAj0Jgo4jsC9PG9Jl8MpyE0PGSVzeq1HPOV4iUYen6oF/I8g1wWggq2FI+WmChfvXmfuDkamy5zxlp66mPq/AEm8PQdnjcnar4i7Ikvzg984/oFR6fSoNKtM4f7vD+8t2Stv+fqFSaWg6xAi4S0YkSLm/Fm5GIJ3DYXySyFASx6s4W1/HOlMkQQv6rXwn+8r/O4k/EfZcRJ0F7PN6VJ1YW7nOTkr26IFe/reM4PDLVHY0F6F5E5QBK4otqt0aMyg8eZbfIMVE8WkKialfD4+4INKsi66RzOYavoi1rarLKJ3QsavWwzLEy/2YMHK3szZKPxqZkkxKzz2AxWJ/s=',
  },
  {
    id: 2,
    name: 'Wade Cooper',
    session: '1AgAOMTQ5LjE1NC4xNjcuNDEBu6U9xXAj0Jgo4jsC9PG9Jl8MpyE0PGSVzeq1HPOV4iUYen6oF/I8g1wWggq2FI+WmChfvXmfuDkamy5zxlp66mPq/AEm8PQdnjcnar4i7Ikvzg984/oFR6fSoNKtM4f7vD+8t2Stv+fqFSaWg6xAi4S0YkSLm/Fm5GIJ3DYXySyFASx6s4W1/HOlMkQQv6rXwn+8r/O4k/EfZcRJ0F7PN6VJ1YW7nOTkr26IFe/reM4PDLVHY0F6F5E5QBK4otqt0aMyg8eZbfIMVE8WkKialfD4+4INKsi66RzOYavoi1rarLKJ3QsavWwzLEy/2YMHK3szZKPxqZkkxKzz2AxWJ/s=',
  },
];

const SessionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // State for active tab
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [batchSize, setBatchSize] = useState<string>('');

 

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const session = new StringSession(selectedAccount.session);
      const client = new TelegramClient(session, apiId, apiHash, {});
      await client.connect();

      const result: Api.messages.DialogFilters = await client.invoke(
        //@ts-ignore
        new Api.messages.GetDialogFilters({})
      );
      

      //@ts-ignore
        const fetchedFolders = result.filters
      //@ts-ignore
        .filter((folder: Api.DialogFilter) => folder.title)
      //@ts-ignore
        .map((folder: Api.DialogFilter, index: number) => ({
          id: index,
          title: folder.title,
          users: folder.includePeers
        }));

      
      setFolders(fetchedFolders);
      setSelectedFolder(fetchedFolders[0] || null);
      console.log(selectedFolder)
      await client.disconnect();
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
    setLoading(false);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(event.target.value);
  };

  const handleBatchSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBatchSize(event.target.value);
  };

  const handleSaveProfile = async () => {
    if (!selectedFolder) {
      console.error('Folder is not selected.');
      return;
    }

  setLoading(true);

  try {
    const data = {
      userId: 2,
      session: selectedAccount.session,
      messageText: message,
      "usernames": selectedFolder.users || [],
      "batchSize": batchSize,
      "waitTime": seconds
    }

    const response = await axios.post('http://localhost:5000/mailing/create', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Profile saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving profile:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen flex flex-col items-center">
      {/* Tabs */}
      <div className="w-full max-w-md text-center">
        <button
          onClick={() => setActiveTab(0)}
          className={`py-2 px-4 font-medium ${activeTab === 0 ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
        >
          Мои
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`py-2 px-4 font-medium ${activeTab === 1 ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
        >
          Добавить
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 0 && (
        <div>
           {true ? (
            <div className="h-screen mt-5 justify-center">
              <div className="w-full max-w-md text-center">
                    <div className="w-full flex justify-between max-w-md items-center mt-5 bg-gray-200 text-black px-3 p-2 rounded-md shadow-md">
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

      {activeTab === 1 && (
        <div className="w-full max-w-md">
          <Selector
            items={accounts}
            selectedItem={selectedAccount}
            setSelectedItem={setSelectedAccount}
            label="Выберите аккаунт"
          />
          <div className="mt-4">
            <button
              onClick={fetchFolders}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Загурзить папки'}
            </button>
          </div>
          {folders.length > 0 && (
          <div className="mt">
            <label htmlFor="password" className="block text-base/10 font-medium text-white text-left">
              Полученные папки
            </label>
            <Listbox value={selectedFolder} onChange={setSelectedFolder}>
              <div className="relative">
                <ListboxButton className="py-2 relative w-full cursor-default rounded-md bg-gray-200 py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate font-medium">
                      {selectedFolder ? selectedFolder.title : 'Select a folder'}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </span>
                </ListboxButton>
                <ListboxOptions className="font-medium absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {folders.map((folder) => (
                    <ListboxOption
                      key={folder.id}
                      value={folder}
                      className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-900"
                    >
                      <span className="block truncate">{folder.title}</span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
            
          <label htmlFor="password" className="block text-base/10 font-medium text-white text-left">
            Сообщение
          </label>
          <input
            type="text"
            name="password"
            className="font-medium bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm\"
            value={message}
            onChange={handleMessageChange} // Добавлен onChange
          />

          <label htmlFor="password" className="block text-base/10 font-medium text-white text-left">
            Задержка в секундах
          </label>
          <input
            type="text"
            name="password"
            className="font-medium bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={seconds}
            onChange={handleSecondsChange} // Добавлен onChange
          />

          <label htmlFor="password" className="block text-base/10 font-medium text-white text-left">
            Размер партии
          </label>
          <input
            type="text"
            name="password"
            className="font-medium bg-gray-200 px-4 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={batchSize}
            onChange={handleBatchSizeChange} // Добавлен onChange
          />

          <button
            onClick={handleSaveProfile }
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md mt-4"
            disabled={loading}
          >
            {loading ? 'Соранение...' : 'Сохранить профиль'}
          </button>
          </div>
        )}
        </div>
      )}
    </div>
  );
};

export default SessionsPage;
