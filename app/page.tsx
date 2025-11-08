import { Github } from "lucide-react";

export default function Home() {
  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl 
        bg-[#f4f7f6] backdrop-blur-md shadow-lg rounded-full px-6 py-3 
        flex items-center justify-between z-50"
    >
      <div className="flex items-center space-x-2">
        <div className="w-16 h-16 bg-[#719e92] rounded-full flex items-center justify-center text-white font-semibold text-xs">
          BioDex
        </div>
        <span className="font-bold text-lg">BioDex</span>
      </div>

      <ul
        id="navbar"
        className="hidden md:flex items-center space-x-6 text-gray-700 font-medium bg-[#f4f7f6]"
      >
        <li><a href="#top" className="hover:text-black">Home</a></li>
        <li><a href="#about" className="hover:text-black">Inventory</a></li>
        <li><a href="#coursesContainer" className="hover:text-black">Plant</a></li>
        <li><a href="#calendar" className="hover:text-black">Profile</a></li>
        <li><a href="#chatbot" className="hover:text-black">Shop</a></li>
      </ul>

      <div className="flex items-center space-x-4">
        {/* GitHub Icon */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          <Github className="w-6 h-6 text-gray-700 hover:text-black" />
        </a>

        <a
          href="#calendarsection"
          className="bg-[#719e92] text-white px-4 py-2 rounded-full hover:bg-[#88a2ad] transition"
        >
          Login In
        </a>
      </div>
    </nav>
  );
}
