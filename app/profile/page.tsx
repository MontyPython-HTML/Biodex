'use client';
import React, { useRef, useEffect } from "react";

import gsap from "gsap";

import { House, PawPrint, Box, User } from "lucide-react";
import Link from "next/link";






export default function Profile() {
useEffect(() => {
    gsap.from(healthRef.current, { x: -200, opacity: 0, duration: 1.5, ease: "power2.out" });
    gsap.from(levelRef.current, { x: 200, opacity: 0, duration: 1.5, ease: "power2.out", delay: 0.5 });
    gsap.from(circleRef.current, { y: 100, opacity: 0, duration: 1.5, ease: "power2.out", delay: 1 });
}, []);
const healthRef = useRef(null);
const levelRef = useRef(null);
const circleRef = useRef(null);
return (
<div>
  <Navbar />

  <div className="flex justify-end w-full pr-10">
    <div className="flex gap-6">

      <div className="flex flex-col w-280 translate-x-30">
        <div ref={healthRef} className="w-[80%] h-40 bg-white shadow-xl rounded-2xl p-8 justify-let translate-y-5">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-headline-large"> Welcome Back!, </h2>
          <h3> HP: <HealthBar value={85} /></h3>
        </div>
        <div id="plantContainer" className="flex flex-row flex-wrap w-[80%] h-full mt-10 py-5 px-8 bg-surface-container-highest rounded-lg overflow-y-auto gap-10">
          
          <div className="flex flex-row border rounded-lg p-4 w-96 h-40 shrink-0 bg-surface-container-high">
          <img src='yup' alt='plant' className="h-full w-[40%] object-cover rounded mb-2" />
          <div className='flex flex-col content-start'>
            <section>
              <h3 className="headline-medium">Plant Name</h3>
              <p className="label-large text-gray-600">Rarity: MYTHICAL!!!!</p>
              <p className="label-large text-gray-600">Output: 1 billion!!!</p>
            </section>
            <button className='mt-auto cursor-pointer w-48 h-8 bg-tertiary-container rounded-md text-on-tertiary-container'>Feed</button>
          </div>
        </div>

        <div className="flex flex-row border rounded-lg p-4 w-96 h-40 shrink-0 bg-surface-container-high">
          <img src='yup' alt='plant' className="h-full w-[40%] object-cover rounded mb-2" />
          <div className='flex flex-col content-start'>
            <section>
              <h3 className="headline-medium">Plant Name</h3>
              <p className="label-large text-gray-600">Rarity: MYTHICAL!!!!</p>
              <p className="label-large text-gray-600">Output: 1 billion!!!</p>
            </section>
            <button className='mt-auto cursor-pointer w-48 h-8 bg-tertiary-container rounded-md text-on-tertiary-container'>Feed</button>
          </div>
        </div>

        <div className="flex flex-row border rounded-lg p-4 w-96 h-40 shrink-0 bg-surface-container-high">
          <img src='yup' alt='plant' className="h-full w-[40%] object-cover rounded mb-2" />
          <div className='flex flex-col content-start'>
            <section>
              <h3 className="headline-medium">Plant Name</h3>
              <p className="label-large text-gray-600">Rarity: MYTHICAL!!!!</p>
              <p className="label-large text-gray-600">Output: 1 billion!!!</p>
            </section>
            <button className='mt-auto cursor-pointer w-48 h-8 bg-tertiary-container rounded-md text-on-tertiary-container'>Feed</button>
          </div>
        </div>

        </div>
      </div>

      <div ref={levelRef}className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <Circle ref={circleRef} />
        <h3 className="text-3xl font-bold text-center mb-6 text-gray-800 font-headline-large"> Level Progress:<LevelBar level={8} currentXP={8} maxXP={20} /> </h3>
      </div>

    </div>
  </div>

  <form />
</div>
);
}

function HealthBar({ value }) {
return (
<div className="w-64 h-6 bg-gray-800 rounded-full overflow-hidden border-2 border-black shadow-md">
<div className="h-full bg-red-500 transition-all duration-500"style={{ width: `${value}%` }}></div>
</div>
);
}


function Navbar() {
return (
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


);
}
function Circle(){
return (
<div className=" items-center mt-10 transalate-y-50">
<div className="w-100 h-100 bg-surface-container-high rounded-full flex justify-center items-center bg-cover bg-[url('https://media.discordapp.net/attachments/1434451712176951447/1437130426039795903/flamadillo.gif?ex=69121f82&is=6910ce02&hm=74abe6565aaf029577160e1d1d15b63eb861304aeff0ba9a48bc05143891e03c&=&width=240&height=240')]">


</div>
</div>
);


}


function LevelBar({ level, currentXP, maxXP }) {
const percentage = (currentXP / maxXP) * 100;

return (
<div className="w-72 flex flex-col items-center">
<p className="text-gray font-semibold mb-1">Level {level}</p>

<div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden border-2 border-black shadow-md">
<div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${percentage}%` }}></div>
</div>

<p className="text-white text-sm mt-1">{currentXP} / {maxXP} XP</p>
</div>
);
}
