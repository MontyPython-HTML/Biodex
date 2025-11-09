"use client";

import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { House, Box, PawPrint, User } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/src/Firebase/auth';

export default function Home() {
  const { firebaseUser, userData, loading } = useAuth();
  const router = useRouter();

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

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center fixed h-screen px-[15px] py-[15px] z-900">
        <section className="flex flex-col gap-5">
          <Link href="/homepage"><House className="w-[39px] h-[39px] text-inverse-primary" /></Link>
          <Link href="/pet"><PawPrint className="w-[39px] h-[39px] text-white" /></Link>
          <Link href="/inventory"><Box className="w-[39px] h-[39px] text-white" /></Link>
        </section>
        <section>
          <User className="w-[39px] h-[39px] text-white cursor-pointer" onClick={handleLogout} />
        </section>
      </nav>

      <div className="flex-1 ml-[69px] p-8">
        <h1 className="text-4xl font-bold mb-6">Welcome, {userData?.username || 'User'}!</h1>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Pet</h2>
            <div className="space-y-2">
              <p><strong>Health:</strong> {userData?.pet?.health || 100}</p>
              <p><strong>Input:</strong> {userData?.pet?.input || 10}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Stats</h2>
            <div className="space-y-2">
              <p><strong>Level:</strong> {userData?.level || 1}</p>
              <p><strong>Plants Collected:</strong> {userData?.plants?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Plants</h2>
          {userData?.plants && userData.plants.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {userData.plants.slice(-4).map((plant, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <img src={plant.pathToStorage} alt={plant.name} className="w-full h-32 object-cover rounded mb-2" />
                  <h3 className="font-semibold text-sm">{plant.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No plants yet. Visit the inventory to add some!</p>
          )}
        </div>
      </div>
    </div>
  );
}
