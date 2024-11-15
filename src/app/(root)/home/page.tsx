'use client';

import { useEffect, useState } from 'react';

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        expand: () => void;
        initDataUnsafe?: {
          user?: TelegramUser;
        };
        MainButton: {
          text: string;
          show: () => void;
        };
      };
    };
  }
}

const HomePage = () => {
  const [userData, setUserData] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();

      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserData(user);
      }

      tg.MainButton.text = "Привет из Telegram Web App";
      tg.MainButton.show();
    }
  }, []);

  return (
    <>
      <div>
        <h1>Telegram Web App с использованием Next.js</h1>
        {userData ? (
          <div>
            <p><strong>Имя пользователя:</strong> {userData.first_name} {userData.last_name}</p>
            <p><strong>Юзернейм:</strong> {userData.username}</p>
            <p><strong>ID:</strong> {userData.id}</p>
          </div>
        ) : (
          <p>Не удалось получить данные о пользователе.</p>
        )}
      </div>
    </>
  );
}


export default HomePage;
