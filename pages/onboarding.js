import { useContext, useLayoutEffect, useState } from 'react';
import Input from '../components/Input';

import Head from 'next/head';
import Navbar from '../components/Navbar';
import gen from "../hooks/gen";
import { useRouter } from 'next/router';
import { add_doc } from '../hooks/firebase';
import { UserContext } from '../contexts/UserContext';


export default function Home() {

  const router = useRouter();
  const [form, setForm] = useState({});
  const { user, userDetails, setUserDetails } = useContext(UserContext);

  useLayoutEffect(() => {
    if(userDetails){
      return () => router.push("/dashboard");
    }

  }, [userDetails]);
  
  const handleSubmit = () => {
    add_doc("farms", user.uid, form)
      .then((success) => {
        localStorage.setItem("passed_onboarding", "true");
        setUserDetails(form);
        router.push("/dashboard")
      });
  }


  return (
    <main className="relative min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>Onboarding</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <section className='py-12 space-y-6'>

        <div className='text-2xl font-bold'>Welcome to farmstock,</div>

        <div className=''>Kindly Fill these neccesarry question,</div>

        <Input 
          name="farm_name"
          placeholder="Farm Name"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.farm_name}
        />

        <Input 
          name="address"
          placeholder="Farm Address"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.address}
        />

        <Input 
          name="state"
          placeholder="State"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.state}
        />

        <div 
          className='block relative isolate'
          onClick={handleSubmit}
        >
          <div className='
            flex justify-center items-center gap-2 px-6 py-3
            bg-transparent border-2 border-black
            rounded-full relative text-black
            peer
          '>
            {/* <AiOutlineGoogle /> */}
            <p className="font-bold font-['Space_Grotesk'] text-center">Submit</p>
          </div>
          <div className='
            absolute top-0 left-0
            bg-lime-400 w-full h-full
            translate-y-1 translate-x-1 
            peer-active:translate-x-0 peer-active:translate-y-0
            -z-[1] rounded-full duration-200
          '></div>
        </div>

      </section>


    </main>
  )
}
