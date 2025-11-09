import Image from 'next/image'
import Head from 'next/head'
import { identifyPlant } from "@/src/plant";    
import * as auth from "@/src/Firebase/auth";
import Link from 'next/link';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await createUser(email, password, username);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-headline-large">
          Sign Up
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Username
            </label>
            <input
              type="username"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="yourname@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
            />
          </div>
          <div><label className="block text-gray-700 mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-secondary-container hover:bg-green-800 transition text-white rounded-xl font-semibold">Sign Up</button>
          <p className="text-center text-sm text-gray-600">Already Have An Account? <Link href="/login" className="text-secondary-container font-medium hover:underline">Login!</Link></p>
        </form>
      </div>
    </div>
  );
}
