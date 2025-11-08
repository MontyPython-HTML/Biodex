"use client";

import { House, PawPrint, Box, User } from "lucide-react";

export default function BioDex() {
  return (
    <div className="flex h-screen bg-background">
      
    
      <Navbar />

      
      <div className="flex-1 flex items-center justify-center bg-background">
        <RightContainer />
      </div>

    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center px-[15px] py-[15px]">
      <section className="flex flex-col gap-5">
        <House className="w-[39px] h-[39px] text-inverse-primary" />
        <PawPrint className="w-[39px] h-[39px] text-white" />
        <Box className="w-[39px] h-[39px] text-white" />
      </section>

      <section>
        <User className="w-[39px] h-[39px] text-white" />
      </section>
    </nav>
  );
}


function RightContainer() {
  return (
    <div className=" w-[1000px] h-[600px] 
      bg-surface-container-highest backdrop-blur-md 
      border border-black rounded-3xl 
      shadow-[0_0_40px_10px_rgba(255,255,255,0.05)]
      " 
    />
  );
}