import Head from 'next/head';
import Image from 'next/image';
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from '../hooks/firebase';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useRouter } from 'next/router';


export default function Home() {

  const {user} = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {

    if(user){
      let passed = localStorage.getItem("passed_onboarding");
      if(!passed){
        router.push("/onboarding");
      }
  
      router.push("/dashboard");
    }

  }, [user])

  return (
    <main className="flex flex-col justify-center items-center relative h-screen isolate">
      <Head>
        <title>Welcome to Farmstock</title>
      </Head>

      <div className='fixed top-0 left-0 bg-green-900 opacity-70 w-full h-full -z-10'></div>

      <Image
        className="object-cover -z-[11]"
        src="/bg.jpg"
        alt=""
        fill
      />

      <Image
        className="object-contain"
        src="/logo-white.png"
        width={100}
        height={100}
        alt="" 
      />
      <div className='text-4xl font-bold'>
        <strong className='text-white'>farm</strong>
        <strong className='text-white'>stock</strong>
      </div>

      <div className='!absolute left-1/2 -translate-x-1/2 bottom-10 w-3/5 inline-block isolate'
        onClick={() => signIn()}
      >
        <div className='
          inline-flex justify-center items-center gap-2 px-6 py-3
          bg-transparent border-2 border-black
          rounded-full text-black w-full
          peer
        '>
          <AiOutlineGoogle />
          <p className="font-bold font-['Space_Grotesk']">Sign in with Google</p>
        </div>
        <div className='
          inline-block absolute top-0 left-0
          bg-lime-400 w-full h-full
          translate-y-1 translate-x-1 
          peer-active:translate-x-0 peer-active:translate-y-0
          -z-[1] rounded-full duration-200
        '></div>
      </div>

    </main>
  )
}
