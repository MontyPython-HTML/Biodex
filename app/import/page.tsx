"use client";

import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { identifyPlant } from '@/src/plant';
import { useRouter } from 'next/navigation';

export default function Import() {
  const { firebaseUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!firebaseUser) {
    router.push('/login');
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const identification = await identifyPlant(file);
      if (!identification) {
        throw new Error('Failed to identify plant');
      }
      setResult(identification);
    } catch (err: any) {
      setError(err.message || 'Failed to identify plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Identify Plant</h2>
        
        {error && <div className="p-3 bg-red-100 text-red-700 rounded-xl">{error}</div>}
        
        {result && (
          <div className="p-4 bg-green-50 rounded-xl">
            <h3 className="font-semibold mb-2">Identification Result:</h3>
            <p><strong>Common Name:</strong> {result.commonName}</p>
            <p><strong>Scientific Name:</strong> {result.scientificName}</p>
            <p><strong>Confidence:</strong> {(result.score * 100).toFixed(1)}%</p>
          </div>
        )}

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
            {loading ? 'Identifying...' : 'Identify Plant'}
          </button>
        </form>
      </div>
    </div>
  );
}
