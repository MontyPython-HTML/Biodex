import Head from 'next/head'
import { House, Box, PawPrint, User } from 'lucide-react';
import Link from 'next/link';

function Pet() {
  return (
    <div className='bg-background w-full h-screen'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kreon:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>

      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center absolute h-screen px-[15px] py-[15px]">
        <section id="topIcons" className='flex flex-col gap-5' color="white">
          <Link href="/"><House id="homeBtn" className='w-[39px] h-[39px]' color='white'/> </Link> 
          <Link href="/pet"><PawPrint id="petBtn" className='w-[39px] h-[39px] text-inverse-primary'/></Link> 
          <Link href="/Inventory"><Box id="inventoryBtn" className='w-[39px] h-[39px]' color="white"/></Link> 
        </section>
        <section id="profile">
          <Link href="/profile"></Link><User id="profileBtn" className='w-[39px] h-[39px]' color="white"/>
        </section>
      </nav>

      <div id='petPage' className='bg-[url(./media/petBkg.png)] bg-cover bg-center bg-fixed w-screen h-screen'>
      </div>

    </div>
  );
}

export default Pet