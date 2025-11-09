
import { House, PawPrint, Box, User } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
export default function Profile() {
return (
<div>
<Navbar />

<div className="flex justify-end w-full pr-10">
<div className="flex gap-6">

<div className="w-220 h-40 bg-white shadow-xl rounded-2xl p-8 justify-let translate-y-5">
<h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-headline-large"> Welcome Back!, </h2>
<h3> HP: <HealthBar value={85} /></h3>
</div>

<div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
<Circle />
<h3 className="text-3xl font-bold text-center mb-6 text-gray-800 font-headline-large"> Level Progress:<LevelBar level={8} currentXP={8} maxXP={20} /> </h3>
</div>

</div>
</div>

<form />
</div>
);
}

function HealthBar({ value }) {
return (
<div className="w-64 h-6 bg-gray-800 rounded-full overflow-hidden border-2 border-black shadow-md">
<div className="h-full bg-red-500 transition-all duration-500"style={{ width: `${value}%` }}></div>
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
<div className=" items-center mt-10 transalate-y-50">
<div className="w-100 h-100 bg-gray-500 rounded-full flex justify-center items-center">
<p className="text-white text-lg">Circle Container</p>
</div>
</div>
);


}


function LevelBar({ level, currentXP, maxXP }) {
const percentage = (currentXP / maxXP) * 100;

return (
<div className="w-72 justify-center">
<p className="text-gray font-semibold mb-1">Level {level}</p>

<div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden border-2 border-black shadow-md">
<div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${percentage}%` }}></div>
</div>

<p className="text-white text-sm mt-1">{currentXP} / {maxXP} XP</p>
</div>
);
}
