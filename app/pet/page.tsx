"use client";

import { House, Box, PawPrint, User } from 'lucide-react';
import Link from 'next/link';
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

  const petHealth = userData?.pet?.health || 100;
  const petInput = userData?.pet?.input || 10;

  return (
    <div className='bg-background w-full min-h-screen'>
      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center fixed h-screen px-[15px] py-[15px] z-900">
        <section className='flex flex-col gap-5'>
          <Link href="/homepage"><House className='w-[39px] h-[39px] text-white' /></Link>
          <Link href="/pet"><PawPrint className='w-[39px] h-[39px] text-inverse-primary' /></Link>
          <Link href="/inventory"><Box className='w-[39px] h-[39px] text-white' /></Link>
        </section>
        <section>
          <User className='w-[39px] h-[39px] text-white' />
        </section>
      </nav>

      <div className='flex-1 ml-[69px] p-8'>
        <h1 className="text-4xl font-bold mb-6">Your Pet</h1>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Pet Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Health</span>
                  <span>{petHealth}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-600 h-4 rounded-full transition-all"
                    style={{ width: `${petHealth}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Input: {petInput}</p>
                <p className="text-sm text-gray-600">
                  Total Plant Output: {userData?.plants?.reduce((sum, plant) => sum + plant.output, 0) || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Actions</h2>
            <button
              onClick={handleFeedPet}
              disabled={processing || !userData?.plants || userData.plants.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Feeding...' : 'Feed Pet with Plants'}
            </button>
            {(!userData?.plants || userData.plants.length === 0) && (
              <p className="text-sm text-gray-500 mt-2">Add plants to your inventory to feed your pet!</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Pet Info</h2>
          <p className="text-gray-700">
            Your pet's health is maintained by feeding it with the plants you collect. 
            Each plant has an output value that contributes to your pet's health when fed.
            Keep collecting plants to keep your pet healthy!
          </p>
        </div>
      </div>
    </div>
  );
}