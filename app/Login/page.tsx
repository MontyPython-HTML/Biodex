

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-headline-large">
          Welcome Back!
        </h2>

        <form className="space-y-5">
          
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

          
          

          
          <button
            type="submit"
            className="w-full py-2 bg-secondary-container hover:bg-green-800 transition text-white rounded-xl font-semibold"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't Have An Account?{" "}
            <a href="http://localhost:3000/Sign" className="text-secondary-container font-medium hover:underline">
              Sign Up!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
