"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { identifyPlant } from '@/src/plant';
import { uploadFile } from '@/src/Firebase/storage';
import { updateDocInFirebase, getUserByUid } from '@/src/Firebase/database';
import { Plant } from '@/src/Models/Plant';
import { useRouter } from 'next/navigation';
import { House, Box, PawPrint, User } from 'lucide-react';
import Link from 'next/link';
import { GetPlantInfo } from '@/src/Utils/Scraper';

export default function Inventory() {
  const { firebaseUser, userData, refreshUserData } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [plantDescriptions, setPlantDescriptions] = useState<Record<number, string>>({});
  const [loadingDescriptions, setLoadingDescriptions] = useState<Record<number, boolean>>({});
  const router = useRouter();

  if (!firebaseUser) {
    router.push('/login');
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setSuccess('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !userData) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Identify plant
      const identification = await identifyPlant(file);
      if (!identification) {
        throw new Error('Failed to identify plant');
      }

      // Upload image to storage
      const storagePath = `plants/${firebaseUser.uid}/${Date.now()}_${file.name}`;
      const imageURL = await uploadFile(file, storagePath);

      // Determine rarity based on score
      const rarity = identification.score > 0.8 ? 'rare' : identification.score > 0.5 ? 'uncommon' : 'common';
      const output = Math.floor(identification.score * 100);

      // Create plant object
      const newPlant: Plant = {
        name: identification.commonName,
        rarity: rarity,
        output: output,
        pathToStorage: imageURL
      };

      // Update user's plants
      const updatedPlants = [...(userData.plants || []), newPlant];
      
      // Find the document ID from Firestore
      const fullUserData = await getUserByUid(firebaseUser.uid);
      if (!fullUserData || !fullUserData.docId) {
        throw new Error('User data not found');
      }

      await updateDocInFirebase(fullUserData.docId, "users", { plants: updatedPlants });
      await refreshUserData();
      
      setSuccess(`Successfully added ${identification.commonName} to your inventory!`);
      setFile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to process plant');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDescriptions = async () => {
      if (!userData?.plants) return;

      const plantsToFetch: Array<{ index: number; name: string }> = [];

      userData.plants.forEach((plant, index) => {
        if (plantDescriptions[index] || plant.description) {
          if (plant.description && !plantDescriptions[index]) {
            setPlantDescriptions(prev => ({ ...prev, [index]: plant.description! }));
          }
          return;
        }

        if (loadingDescriptions[index]) {
          return;
        }

        plantsToFetch.push({ index, name: plant.name });
      });

      plantsToFetch.forEach(async ({ index, name }) => {
        setLoadingDescriptions(prev => ({ ...prev, [index]: true }));

        try {
          const description = await GetPlantInfo(name);
          if (description) {
            setPlantDescriptions(prev => ({ ...prev, [index]: description }));
          }
        } catch (error) {
          console.error(`Error fetching description for ${name}:`, error);
        } finally {
          setLoadingDescriptions(prev => {
            const newState = { ...prev };
            delete newState[index];
            return newState;
          });
        }
      });
    };

    fetchDescriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.plants]);

  return (
    <div className="min-h-screen bg-background flex">
      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center fixed h-screen px-[15px] py-[15px] z-[900]">
        <section className="flex flex-col gap-5">
          <Link href="/homepage"><House className="w-[39px] h-[39px] text-white" /></Link>
          <Link href="/pet"><PawPrint className="w-[39px] h-[39px] text-white" /></Link>
          <Link href="/inventory"><Box className="w-[39px] h-[39px] text-inverse-primary" /></Link>
        </section>
        <section>
          <User className="w-[39px] h-[39px] text-white" />
        </section>
      </nav>

      <div className="flex-1 ml-[69px] p-8">
        <h1 className="text-4xl font-bold mb-6">Inventory</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload Plant Image</h2>
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl">{success}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded p-2 cursor-pointer"
              required
            />
            <button
              type="submit"
              disabled={loading || !file}
              className="bg-secondary-container text-white font-medium py-2 rounded hover:bg-green-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Identify and Add Plant'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Plants ({userData?.plants?.length || 0})</h2>
          <div className="grid grid-cols-3 gap-4">
            {userData?.plants?.map((plant, index) => (
              <div key={index} className="border rounded-lg p-4 flex flex-col">
                <img src={plant.pathToStorage} alt={plant.name} className="w-full h-48 object-cover rounded mb-2" />
                <h3 className="font-semibold">{plant.name}</h3>
                <p className="text-sm text-gray-600">Rarity: {plant.rarity}</p>
                <p className="text-sm text-gray-600">Output: {plant.output}</p>
                {loadingDescriptions[index] ? (
                  <p className="text-xs text-gray-400 mt-2 italic">Loading description...</p>
                ) : (plantDescriptions[index] || plant.description) ? (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3">
                    {plantDescriptions[index] || plant.description}
                  </p>
                ) : null}
              </div>
            ))}
            {(!userData?.plants || userData.plants.length === 0) && (
              <p className="text-gray-500 col-span-3">No plants yet. Upload an image to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
