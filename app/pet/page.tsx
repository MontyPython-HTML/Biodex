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
  const [processingPlantIndex, setProcessingPlantIndex] = useState<number | null>(null);

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
      const maxHP = 100 + (userData.level * 10);
      const updatedHealth = Math.min(maxHP, userData.pet.health + newHealth);

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

  const handleFeedPlant = async (plantIndex: number) => {
    if (!userData || processingPlantIndex !== null || !userData.plants || plantIndex < 0 || plantIndex >= userData.plants.length) return;

    setProcessingPlantIndex(plantIndex);
    try {
      const plant = userData.plants[plantIndex];
      
      const currentMaxHP = 100 + (userData.level * 10);
      
      const healthGain = Math.min(plant.output, currentMaxHP - userData.pet.health);
      const updatedHealth = Math.min(currentMaxHP, userData.pet.health + healthGain);
      
      const levelIncrease = Math.floor(plant.output / 10);
      const newLevel = userData.level + (levelIncrease > 0 ? levelIncrease : 1);
      
      const newMaxHP = 100 + (newLevel * 10);
      
      const finalHealth = Math.min(newMaxHP, updatedHealth);
      
      const updatedPlants = userData.plants.filter((_, index) => index !== plantIndex);

      const fullUserData = await getUserByUid(firebaseUser.uid);
      if (!fullUserData || !fullUserData.docId) {
        throw new Error('User data not found');
      }

      await updateDocInFirebase(fullUserData.docId, "users", {
        pet: {
          health: finalHealth,
          input: userData.pet.input
        },
        level: newLevel,
        plants: updatedPlants
      });

      await refreshUserData();
    } catch (error) {
      console.error('Error feeding plant:', error);
    } finally {
      setProcessingPlantIndex(null);
    }
  };

  var lastTime: number = 0;

  if (Math.floor((new Date().getTime() - lastTime)/60000) < 2 ) {
    handleFeedPet()
  }

  const petHealth = userData?.pet?.health || 100;
  const petInput = userData?.pet?.input || 10;
  const petLevel = userData?.level || 1;
  
  const calculateMaxHP = (level: number) => {
    return 100 + (level * 10);
  };
  
  const maxHP = calculateMaxHP(petLevel);
  
  const healthPercentage = Math.min(100, Math.max(0, (petHealth / maxHP) * 100));
  
  const xpProgress = (petLevel % 10) * 10;
  const xpPercentage = Math.min(100, xpProgress);

  // Determine pet evolution based on level
  // Levels 1-9: flamadillo
  // Levels 10-19: flamarillo
  // Levels 20+: shellblaze
  const getPetEvolution = (level: number) => {
    if (level >= 20) {
      return { image: shellblaze, name: "Shellblaze" };
    } else if (level >= 10) {
      return { image: flamarillo, name: "Flamarillo" };
    } else {
      return { image: flamadillo, name: "Flamadillo" };
    }
  };

  const currentPet = getPetEvolution(petLevel);

  return (
    <div className='bg-background w-full h-screen'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kreon:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>

      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center absolute h-screen px-[15px] py-[15px] z-[900]">
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
        <Image src={currentPet.image} alt={currentPet.name} className='w-[45vmin] overflow-hidden image-rendering-pixelated' />
      </div>

      <div className='absolute bottom-0 right-0 w-[40%] h-[30%] rounded-tl-xl z-[800] bg-surface-container-highest p-5 flex flex-col gap-5'>
        <h1 className='headline-large'>Pet Stats</h1>
        <h2 className='title-large'>Health: {Math.floor(petHealth)}/{maxHP}</h2>
        <div id="healthBar" className="w-full h-[10%] bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
          <div 
            className="h-full bg-red-500 rounded-full transition-all duration-300"
            style={{ width: `${healthPercentage}%` }}
          ></div>
        </div>

        <h2 className='title-large'>Level: {petLevel} | XP: {xpProgress}%</h2>
        <div id="expBar" className="w-full h-[10%] bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
          <div 
            className="h-full bg-inverse-primary rounded-full transition-all duration-300"
            style={{ width: `${xpPercentage}%` }}
          ></div>
        </div>
      </div>

      <div id="plantBar" className='absolute bottom-0 w-[60vw] h-[23%] z-[799] bg-surface-container flex flex-row justify-start p-2 pl-20 overflow-x-auto gap-4 left-1 '>
        {userData?.plants && userData.plants.length > 0 ? (
          userData.plants.map((plant, index) => (
            <div key={index} className="flex flex-row border rounded-lg p-4 w-96 shrink-0 bg-surface-container-high">
              <img 
                src={plant.pathToStorage} 
                alt={plant.name} 
                className="h-full w-[40%] object-cover rounded mb-2" 
              />
              <div className='flex flex-col content-start justify-between flex-1'>
                <section>
                  <h3 className="headline-medium">{plant.name}</h3>
                  <p className="label-large text-gray-600">Rarity: {plant.rarity}</p>
                  <p className="label-large text-gray-600">Output: {plant.output}</p>
                </section>
                <button
                  onClick={() => handleFeedPlant(index)}
                  disabled={processingPlantIndex !== null}
                  className="mt-2 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {processingPlantIndex === index ? 'Feeding...' : 'Feed Pet'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500">No plants yet. Add plants in your inventory!</p>
          </div>
        )}
      </div>
    </div>
  );
}
