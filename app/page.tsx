import Head from 'next/head'
import { House, Box, PawPrint, User } from 'lucide-react';
import Link from 'next/link';

export default function Home () {
  return (
    <div className="bg-background w-full h-screen">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kreon:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <nav className="flex flex-col bg-secondary-container w-[69px] justify-between items-center fixed h-screen px-[15px] py-[15px] z-900">
        <section id="topIcons" className='flex flex-col gap-5'>
          <Link href="/"><House id="homeBtn" className='w-[39px] h-[39px] text-inverse-primary'/> </Link> 
          <Link href="/pet"><PawPrint id="petBtn" className='w-[39px] h-[39px]' color='white'/></Link> 
          <Link href="/inventory"><Box id="inventoryBtn" className='w-[39px] h-[39px]' color="white"/></Link> 
        </section>
        <section id="profile">
          <User id="profileBtn" className='w-[39px] h-[39px]' color="white"/>
        </section>
      </nav>
      <div id='homePage' className='flex flex-col'>
        <div id="aboutPage" className='bg-background bg-[url(./media/leavesBkg.png)] bg-cover h-screen bg-right p-35 flex flex-col justify-center'>
          <h1 id="mainTitle" className='font-(family-name:--font-kreon) text-[10vmin] float-left leading-25'>BioDex</h1>
          <p id="aboutText" className='body-large w-[40%] gap-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec molestie purus, sed porttitor urna. Nullam id odio at sem ultricies finibus. Donec lectus erat, pretium ac orci nec, sollicitudin vulputate velit. Etiam efficitur leo et sem cursus feugiat at ac mi. Nulla euismod viverra laoreet. Nulla tempus turpis quam, ut eleifend metus fermentum porttitor. Aenean tempor ligula lacinia risus tempus, eu scelerisque nibh molestie. Maecenas fermentum, tellus vitae consectetur pellentesque, enim urna accumsan massa, et rutrum quam mi non leo. Donec eu congue ipsum, eget iaculis ipsum. Nullam dignissim magna ultrices felis bibendum ultrices. Aliquam erat volutpat. In a magna sed erat mollis suscipit. Morbi eu bibendum justo.</p>
        </div>

        <div id="signUpPage" className='bg-radial-[at_60%_30%] from-[#424A32] to-inverse-surface bg-cover h-[150vh] w-full bg-right p-35 flex flex-col items-center gap-40 z-500 overflow-x-hidden overflow-y-hidden'>
          <div id="getStartedPage"className='flex flex-row content-center items-center'>
            <h1 id="getStartedTitle" className='font-(family-name:--font-kreon) text-[10vmin] text-inverse-on-surface w-150'>Get Started Now!</h1> 
            <div id='signUpSurface' className='w-[35vw] h-[342px] bg-surface-container-high rounded-xl flex flex-col items-center justify-center gap-5'>
              <Link href="/sign"><button className='bg-tertiary-container text-on-tertiary-container w-[30vw] h-20 rounded-xl font-(family-name:--font-poppins) text-[3vmin] cursor-pointer'>Sign Up</button></Link>
              <h2 className='display-medium'>or</h2>
              <Link href="/login"><button className='bg-tertiary-container text-on-tertiary-container w-[30vw] h-20 rounded-xl font-(family-name:--font-poppins) text-[3vmin] cursor-pointer'>Log In</button></Link>
            </div>
          </div>
          <div id="exampleImagesPage" className="w-full">
            <section id="bigolcircle" className="w-800 h-400 rounded-[100%] bg-secondary-fixed-dim overflow-hidden -translate-x-[28%]"></section>
          </div>
          <img className='bg-white w-[50vmin] h-[50vmin] z-800 absolute top-440 left-70 rounded-xl' alt="dex example"></img>
          <img className='bg-white w-[50vmin] h-[50vmin] z-800 absolute top-440 left-230 rounded-xl' alt="biomon example"></img>
        </div>
      </div>
    </div>
  );
}

console.log(process.env.NEXT_PUBLIC_FIREBASE_KEY);
