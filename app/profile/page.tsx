
import { House, PawPrint, Box, User } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
export default function Profile() {
    return (
<div>
        <Navbar />
<div className=" items-center mt-10 translate-x-70">
<div className="w-100 h-100 bg-gray-500 rounded-full flex justify-center items-center">
<p className="text-white text-lg">Circle Container</p>
</div>
</div>
<form />
</div>
    );
}

function Navbar() {
    return (
    <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center fixed h-screen px-[15px] py-[15px] z-900">
<section id="topIcons" className='flex flex-col gap-5'>
          <Link href="/"><House id="homeBtn" className='w-[39px] h-[39px] text-inverse-primary'/> </Link> 
          <Link href="/pet"><PawPrint id="petBtn" className='w-[39px] h-[39px]' color='white'/></Link> 
          <Link href="/inventory"><Box id="inventoryBtn" className='w-[39px] h-[39px]' color="white"/></Link> 
        </section>
        <section id="profile">
          <Link href="/profile"><User id="profileBtn" className='w-[39px] h-[39px]' color="white"/></Link>
        </section>
      </nav>


  );
}
function Circle(){
    return (
        <div className="flex justify-center items-center mt-10">
        <div className="w-40 h-40 bg-blue-500 rounded-full flex justify-center items-center">
          <p className="text-white text-lg">Circle Container</p>
        </div>
      </div>
    );


}

function form(){
    return (
    <div>
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
          <button type="submit" className="w-full py-2 bg-secondary-container hover:bg-green-800 transition text-white rounded-xl font-semibold">Log In </button>
          <p className="text-center text-sm text-gray-600">
            Don't Have An Account?{" "}
            <Link href="/sign" className="text-secondary-container font-medium hover:underline">
              Sign Up!
            </Link>
          </p>
        </form>
        </div>
);

}
