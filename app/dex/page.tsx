"use client";

import { House, PawPrint, Box, User } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BioDex() {
  const { firebaseUser, userData, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!firebaseUser) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-background">
        <RightContainer plants={userData?.plants || []} />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center px-[15px] py-[15px]">
      <section className="flex flex-col gap-5">
        <Link href="/homepage"><House className="w-[39px] h-[39px] text-inverse-primary" /></Link>
        <Link href="/pet"><PawPrint className="w-[39px] h-[39px] text-white" /></Link>
        <Link href="/inventory"><Box className="w-[39px] h-[39px] text-white" /></Link>
      </section>

      <section>
        <User className="w-[39px] h-[39px] text-white" />
      </section>
    </nav>
  );
}

function RightContainer({ plants }: { plants: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const children = containerRef.current.children;
      gsap.fromTo(
        children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.15 }
      );
    }
  }, [plants]);

  return (
    <div
      ref={containerRef}
      className="w-[1000px] h-[600px] bg-surface-container-highest backdrop-blur-md border border-black rounded-3xl shadow-[0_0_40px_10px_rgba(255,255,255,0.05)] grid grid-cols-3 gap-6 p-6 overflow-auto"
    >
      {plants.length > 0 ? (
        plants.map((plant, i) => (
          <IndexContainer key={i} plant={plant} />
        ))
      ) : (
        <div className="col-span-3 flex items-center justify-center text-gray-500">
          No plants in your dex yet. Visit inventory to add some!
        </div>
      )}
    </div>
  );
}

function IndexContainer({ plant }: { plant: any }) {
  return (
    <div className="w-[140px] h-[220px] bg-tertiary-container border border-black rounded-3xl shadow-[0_0_40px_10px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center p-2">
      <Photo imageUrl={plant.pathToStorage} />
      <p className="text-xs mt-2 text-center font-semibold">{plant.name}</p>
      <p className="text-xs text-gray-600">{plant.rarity}</p>
    </div>
  );
}

function Photo({ imageUrl }: { imageUrl: string }) {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
      );
    }
  }, []);

  return (
    <div
      ref={photoRef}
      className="w-[120px] h-[140px] bg-white border border-black rounded-3xl shadow-[0_0_40px_10px_rgba(255,255,255,0.05)] overflow-hidden"
    >
      <img src={imageUrl} alt="Plant" className="w-full h-full object-cover" />
    </div>
  );
}
