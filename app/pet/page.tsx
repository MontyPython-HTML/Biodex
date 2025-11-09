"use client";

import { House, Box, PawPrint, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import petBkg from '../media/petBkg.png'
import Head from 'next/head'
import flamadillo from '../media/flamadillo.gif'
import flamarillo from '../media/flamarillo.gif'
import shellblaze from '../media/shellblaze.gif'
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateDocInFirebase, getUserByUid } from '@/src/Firebase/database';
import { changeHealth, updateHealth, updateInput } from '@/src/Utils/Math';

export default function Pet() {
  const { firebaseUser, userData, refreshUserData, loading } = useAuth();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!firebaseUser) {
    router.push('/login');
    return null;
  }

  const handleFeedPet = async () => {
    if (!userData || processing) return;

    setProcessing(true);
    try {
      const totalOutput = userData.plants?.reduce((sum, plant) => sum + plant.output, 0) || 0;
      const newHealth = changeHealth(userData.pet.input, totalOutput);
      const updatedHealth = Math.min(100, userData.pet.health + newHealth);

      const fullUserData = await getUserByUid(firebaseUser.uid);
      if (!fullUserData || !fullUserData.docId) {
        throw new Error('User data not found');
      }

      await updateDocInFirebase(fullUserData.docId, "users", {
        pet: {
          health: updatedHealth,
          input: userData.pet.input
        }
      });

      await refreshUserData();
    } catch (error) {
      console.error('Error feeding pet:', error);
    } finally {
      setProcessing(false);
    }
  };

  var lastTime: number = 0;

  if (Math.floor((new Date() - lastTime)/60000) < 2 ) {
    handleFeedPet()
  }

  const petHealth = userData?.pet?.health || 100;
  const petInput = userData?.pet?.input || 10;
   
  let expFraction = userData.level/10
  let healthFraction = userData.pet.health

  let exp: String = `h-full bg-inverse-primary rounded-full w-${expFraction}`
  let health: String = `h-full bg-red-500 rounded-full w-${healthFraction}`

  return (
    <div className='bg-background w-full h-screen'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kreon:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>

      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center absolute h-screen px-[15px] py-[15px] z-900">
        <section id="topIcons" className='flex flex-col gap-5' color="white">
          <Link href="/homepage"><House id="homeBtn" className='w-[39px] h-[39px] text-white'/> </Link> 
          <Link href="/pet"><PawPrint id="petBtn" className='w-[39px] h-[39px] text-inverse-primary'/></Link> 
          <Link href="/inventory"><Box id="inventoryBtn" className='w-[39px] h-[39px] text-white'/></Link> 
        </section>
        <section id="profile">
          <Link href="/profile"><User id="profileBtn" className='w-[39px] h-[39px]' color="white"/></Link>
        </section>
      </nav>

      <Image src={petBkg} alt="Pixel art forest background" className='w-full absolute z-0 image-rendering-pixelated h-screen overflow-hidden'/>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image src={flamadillo} alt="Flamadillo" className='w-[45vmin] overflow-hidden image-rendering-pixelated' />
      </div>

      <div className='absolute bottom-0 right-0 w-[40%] h-[30%] rounded-tl-xl z-800 bg-surface-container-highest p-5 flex flex-col gap-5'>
        <h1 className='headline-large'>Pet Stats</h1>
        <h2 className='title-large'>Health</h2>
        <div className="w-full h-[10%] bg-gray-200 rounded-full dark:bg-gray-700">
          <div className={health}></div>
        </div>

        <h2 className='title-large'>EXP</h2>
        <div className="w-full h-[10%] bg-gray-200 rounded-full dark:bg-gray-700">
          <div className={exp}></div>
        </div>
      </div>

      <div id="plantBar" className='absolute bottom-0 w-[60vw] h-[23%] z-799 bg-surface-container flex flex-row justify-start p-2 pl-20 overflow-x-auto gap-4 left-1 '>
        <div className="flex flex-row border rounded-lg p-4 w-96 shrink-0 bg-surface-container-high">
          <img src='yup' alt='plant' className="h-full w-[40%] object-cover rounded mb-2" />
          <div className='flex flex-col content-start'>
            <section>
              <h3 className="headline-medium">Plant Name</h3>
              <p className="label-large text-gray-600">Rarity: MYTHICAL!!!!</p>
              <p className="label-large text-gray-600">Output: 1 billion!!!</p>
            </section>
          </div>
        </div> 

        <div className="flex flex-row border rounded-lg p-4 w-96 shrink-0 bg-surface-container-high">
          <img src='yup' alt='plant' className="h-full w-[40%] object-cover rounded mb-2" />
          <div className='flex flex-col content-start'>
            <section>
              <h3 className="headline-medium">Plant Name</h3>
              <p className="label-large text-gray-600">Rarity: MYTHICAL!!!!</p>
              <p className="label-large text-gray-600">Output: 1 billion!!!</p>
            </section>
          </div>
        </div>

        <div className="flex flex-row border rounded-lg p-4 w-96 shrink-0 bg-surface-container-high">
          <img src='yup' alt='plant' className="h-full w-[40%] object-cover rounded mb-2" />
          <div className='flex flex-col content-start'>
            <section>
              <h3 className="headline-medium">Plant Name</h3>
              <p className="label-large text-gray-600">Rarity: MYTHICAL!!!!</p>
              <p className="label-large text-gray-600">Output: 1 billion!!!</p>
            </section>
          </div>
        </div> 
      </div>
    </div>
  );
}
