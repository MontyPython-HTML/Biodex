import { Home as HomeIcon, Boxes, Sprout, User, Github } from "lucide-react";

// import { identifyPlant } from '../src/plant';
import * as database from '../src/firebase/database'
import * as auth from '../src/firebase/auth'

auth.print()

export default function Home() {
  return (
    <div className="flex min-h-screen">
      
      <nav className="fixed left-0 top-0 w-24 h-full bg-[#444C34] shadow-lg flex flex-col items-center py-6">
        {/* Logo */}
        <div className="w-16 h-16 bg-[#719e92] rounded-full flex items-center justify-center text-white font-semibold text-xs">
          BD
        </div> 

        
        <ul className="flex flex-col items-center mt-10 space-y-8">
          <li>
            <a href="#top" className="hover:text-[#719e92] transition">
              <HomeIcon className="w-7 h-7 text-white" />
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-[#719e92] transition">
              <Boxes className="w-7 h-7 text-white" />
            </a>
          </li>
          <li>
            <a href="#coursesContainer" className="hover:text-[#719e92] transition">
              <Sprout className="w-7 h-7 text-white" />
            </a>
          </li>
          <li>
            <a href="#calendar" className="hover:text-[#719e92] transition">
              <User className="w-7 h-7 text-white" />
            </a>
          </li>
        </ul>

        
        <div className="mt-auto flex flex-col items-center space-y-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#719e92] transition"
          >
            <Github className="w-7 h-7 text-white" />
          </a>

          <a
            href="#calendarsection"
            className="bg-[#719e92] text-white px-4 py-2 rounded-full hover:bg-[#88a2ad] transition text-xs"
          >
            Login
          </a>
        </div>
      </nav>

    
      <main className="flex-1 ml-24">
        {/* Your page content here, e.g., parallax sections */}
      </main>
    </div>
  );
}

// identifyPlant('./media/test.jpg');
