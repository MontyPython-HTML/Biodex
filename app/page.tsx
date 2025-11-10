"use client";

import Head from 'next/head';
import Link from 'next/link';
import { House, Box, PawPrint, User } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';

export default function Home () {
  const aboutRef = useRef(null);
  const signUpRef = useRef(null);
  const getStartedRef = useRef(null);
  return (
    <div className='bg-background w-full h-screen'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kreon:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center fixed h-screen px-[15px] py-[15px] z-900">
        <section id="topIcons" className='flex flex-col gap-5'>
          <Link href="/homepage"><House id="homeBtn" className='w-[39px] h-[39px] text-inverse-primary'/> </Link>
          <Link href="/pet"><PawPrint id="petBtn" className='w-[39px] h-[39px]' color='white'/></Link>
          <Link href="/inventory"><Box id="inventoryBtn" className='w-[39px] h-[39px]' color="white"/></Link>
        </section>
        <section id="profile">
          <Link href="/profile"><User id="profileBtn" className='w-[39px] h-[39px]' color="white"/></Link>
        </section>
      </nav>
      <div id='homePage'  className='flex flex-col '>
        <div id="aboutPage" ref={aboutRef} className='bg-background bg-[url(./media/leavesBkg.png)] bg-cover h-screen bg-right p-35 flex flex-col justify-center snap-x snap-mandatory overflow-x-hidden overflow-y-hidden'>
            <h1 id="mainTitle" className='font-(family-name:--font-kreon) text-[10vmin] float-left leading-25'>BioDex</h1>
            <p id="aboutText" className='body-large w-[40%] gap-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec molestie purus, sed porttitor urna. Nullam id odio at sem ultricies finibus. Donec lectus erat, pretium ac orci nec, sollicitudin vulputate velit. Etiam efficitur leo et sem cursus feugiat at ac mi. Nulla euismod viverra laoreet. Nulla tempus turpis quam, ut eleifend metus fermentum porttitor. Aenean tempor ligula lacinia risus tempus, eu scelerisque nibh molestie. Maecenas fermentum, tellus vitae consectetur pellentesque, enim urna accumsan massa, et rutrum quam mi non leo. Donec eu congue ipsum, eget iaculis ipsum. Nullam dignissim magna ultrices felis bibendum ultrices. Aliquam erat volutpat. In a magna sed erat mollis suscipit. Morbi eu bibendum justo.</p>
        </div>


<div id="signUpPage" ref={signUpRef} className="h-screen w-full bg-radial-[at_60%_30%] from-[#424A32] to-inverse-surface bg-cover flex flex-col items-center justify-center  px-[100px] overflow-hidden snap-always"> <div id="getStartedPage" ref={getStartedRef} className="flex flex-row items-center gap-20"> <h1 id="getStartedTitle" className="font-(family-name:--font-kreon) text-[10vmin] text-inverse-on-surface font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">Get Started Today! </h1>
<div id="signUpSurface" className="w-[35vw] h-[342px] bg-surface-container-high rounded-2xl shadow-xl flex flex-col items-center justify-center gap-6 backdrop-blur-md border border-white/10">
<Link href="/sign">
<button className="bg-tertiary-container text-on-tertiary-container  w-[28vw] h-20 rounded-xl font-(family-name:--font-poppins) text-[3vmin] hover:scale-105 transition-all duration-200 shadow-md">
Sign Up</button></Link>
<h2 className="display-medium text-on-surface-variant">or</h2>
<Link href="/login"><button className="bg-tertiary-container text-on-tertiary-container w-[28vw] h-20 rounded-xl font-(family-name:--font-poppins) text-[3vmin] hover:scale-105 transition-all duration-200 shadow-md">Log In</button></Link>
</div>
</div>
</div>

</div>
</div>
);
}
