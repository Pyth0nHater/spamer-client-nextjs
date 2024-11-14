import Head from 'next/head';
import TelegramWebApp from './(root)/home/page';
import Script from 'next/script';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Telegram Web App</title>
      </Head>
      <TelegramWebApp />
    </div>
  );
}
