'use client';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { House, Box, PawPrint, User } from 'lucide-react';
import { identifyPlant } from "@/src/plant";    
import * as auth from "@/src/Firebase/auth";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



export default function Home () {
  const aboutRef=useRef(null);
  const signUpRef=useRef(null);
  const getStartedRef=useRef(null);
  useEffect(() => {
    gsap.from("#mainTitle",{ x: -200, opacity: 0, duration: 1.5, ease: "power2.out" });
    gsap.from("#aboutText",{ x: 200, opacity: 0,   duration: 1.5, ease: "power2.out", delay: 0.5, ease: "power3.out" });
    gsap.from("#getStartedTitle",{ y: 100, opacity: 0, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: "#getStartedTitle", start: "top 80%", end: "bottom 60%", scrub: true } });
    gsap.from("#signUpSurface",{ y: 100, opacity: 0, duration: 1.5, ease: "power2.out", delay: 0.5, scrollTrigger: { trigger: "#signUpSurface", start: "top 80%", end: "bottom 60%", scrub: true } });
    gsap.from("#homePage",{ opacity: 0, duration: 2, ease: "power2.out" });


  }, []);
  return (
    <div className='bg-background w-full h-screen'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kreon:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center fixed h-screen px-[15px] py-[15px] z-900">
        <section id="topIcons" className='flex flex-col gap-5'>
          <Link href="/"><House id="homeBtn" className='w-[39px] h-[39px] text-inverse-primary'/> </Link>
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
            <p id="aboutText" className='body-large w-[40%] gap-0'>When trying to convince people to get some natural sunlight and go outside, the one question they ask is "Why should I?" This comes from a desire for incentive. People love instant gratification, and sadly, better physical and mental health doesn't count for that. That's why we made Biodex! Biodex motivates you to go outside by providing you with a cute little herbivore companion you need to take care of. The companion can only be fed plants that the user takes pictures of, so the user has to go outside to provide for their pet.</p>
        </div>


        <div id="signUpPage" ref={signUpRef} className='bg-radial-[at_60%_30%] from-[#424A32] to-inverse-surface bg-cover h-screen w-full bg-right p-35 flex flex-col gap-70 z-500 overflow-x-hidden overflow-y-hidden content-center items-center justify-center pl-[100px] snap-always'>
          <div id="getStartedPage" ref={getStartedRef}className='flex flex-row content-center items-center'>
            <h1 id="getStartedTitle" className='font-(family-name:--font-kreon) text-[10vmin] text-inverse-on-surface w-150'>Get Started Today!</h1>
            <div id='signUpSurface' className='w-[35vw] h-[342px] bg-surface-container-high rounded-xl flex flex-col items-center justify-center gap-5'>
              <Link href="/sign"><button className='bg-tertiary-container text-on-tertiary-container w-[30vw] h-20 rounded-xl font-(family-name:--font-poppins) text-[3vmin] cursor-pointer'>Sign Up</button></Link>
              <h2 className='display-medium'>or</h2>
              <Link href="/login"><button className='bg-tertiary-container text-on-tertiary-container w-[30vw] h-20 rounded-xl font-(family-name:--font-poppins) text-[3vmin] cursor-pointer'>Log In</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

console.log(process.env.NEXT_PUBLIC_FIREBASE_KEY);
