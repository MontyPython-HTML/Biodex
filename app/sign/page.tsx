"use client";

import Image from 'next/image'
import Head from 'next/head'
import { identifyPlant } from "@/src/plant";    
import * as auth from "@/src/Firebase/auth";
import Link from 'next/link';
import { useState } from "react";

export default function SignIn() {
const [password, setPassword] = useState("");
const [confirm, setConfirm] = useState("");
const [match, setMatch] = useState(true);

function handleCheck(pwd, conf){setMatch(pwd === conf);}

return (
<div className="min-h-screen flex items-center justify-center bg-background">
<div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
<h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-headline-large">Sign Up
</h2>

<form className="space-y-5">
<div>
<label className="block text-gray-700 mb-1 font-medium">
Username
</label>
<input type="username" className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Username"
/>
</div>
<div>
<label className="block text-gray-700 mb-1 font-medium"> Email </label>
<input type="email" required className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"placeholder="yourname@email.com"
/>
</div>
<div>
<label className="block text-gray-700 mb-1 font-medium">
Password
</label>
<input type="password" value={password}onChange={(e)=>{setPassword(e.target.value);handleCheck(e.target.value,confirm);}}className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"placeholder="••••••••"/>
</div>
<div><label className="block text-gray-700 mb-1 font-medium">Confirm Password</label><input type="password" value={confirm}onChange={(e)=>{setConfirm(e.target.value);handleCheck(password,e.target.value);}}className={`w-full px-4 py-2 rounded-xl border ${confirm.length>0&&!match?"border-red-500":"border-gray-300"} focus:outline-none focus:ring-2 ${confirm.length>0&&!match?"focus:ring-red-500":"focus:ring-green-600"}`}placeholder="••••••••"/>
{confirm.length>0&&!match&&(
<p className="text-red-600 text-sm mt-1">Passwords do not match</p>)}
{confirm.length>0&&match&&(<p className="text-green-600 text-sm mt-1">Passwords match!</p>
)}
</div>
<button type="submit" className="w-full py-2 bg-secondary-container hover:bg-green-800 transition text-white rounded-xl font-semibold ">
Sign Up</button>
<p className="text-center text-sm text-gray-600">
Already Have An Account?
<Link href="/login" className="text-secondary-container font-medium hover:underline">
Login!
</Link>
</p>
</form>
</div>
</div>
  );
}
