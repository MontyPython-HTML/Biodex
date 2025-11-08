"use client";

import { House, PawPrint, Box, User } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,{ x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" } // end state
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className=" w-[1000px] h-[600px]  bg-surface-container-highest backdrop-blur-md border border-black rounded-3xl shadow-[0_0_40px_10px_rgba(255,255,255,0.05)]"
    >
      <IndexContainer />
    </div>
  );
}

function IndexContainer() {
  const indexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (indexRef.current) {
      gsap.fromTo(
        indexRef.current, { scale: 0, opacity: 0 },{ scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 1 }
      );
    }
  }, []);

  return (
    <div
      ref={indexRef}
      className="w-[140px] h-[220px] bg-tertiary-container border border-black rounded-3xl shadow-[0_0_40px_10px_rgba(255,255,255,0.05)]
      "
    >
      <Photo />
    </div>
  );
}

function Photo() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,{ y: -50, opacity: 0 },{ y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.2 }
      );
    }
  }, []);

  return (
    <div
      ref={photoRef}
      className="w-[120px] h-[140px] bg-white border border-black rounded-3xl shadow-[0_0_40px_10px_rgba(255,255,255,0.05)] m-[8px]
      "
    />
  );
}
