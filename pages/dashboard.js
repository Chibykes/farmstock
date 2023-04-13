import Image from 'next/image';
import { AiOutlineGoogle, AiOutlineMinus, AiOutlinePieChart, AiOutlinePlus } from 'react-icons/ai';
import { RiFileHistoryFill } from 'react-icons/ri';
import { GiCow } from 'react-icons/gi';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../contexts/UserContext';

const menu = [
  {
    Icon: GiCow,
    title: "Add Animal/ Produce",
    subtitle: "Add animal to inventory",
    link: "/add-item"
  },
  {
    Icon: AiOutlinePlus,
    title: "Sales",
    subtitle: "Record sales from your farm",
    link: "/add-sales"
  },
  {
    Icon: AiOutlineMinus,
    title: "Expenses",
    subtitle: "Record expenses from managing your farm",
    link: "/add-expenses"
  },
  {
    Icon: AiOutlinePieChart,
    title: "Monitor",
    subtitle: "Check Farm Performance",
    link: "/monitor"
  },
]

export default function Home() {

  const router = useRouter();
  const {user, userDetails} = useContext(UserContext);

  useEffect(() => {
    if(!user){
      router.push("/")
    }
  }, []);

  return (
    <main className="min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>Dashboard</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <Navbar 
        text="Dashboard"
        noback 
      />


      <section className='py-12'>

        <p className='font-bold text-2xl capitalize'>
          Hello, {userDetails?.farm_name} 👋
        </p>

        <div className='max-w-md mx-auto'>
          <div className='grid grid-cols-2 gap-4 py-12'>

            <div className='flex justify-end col-span-2'>
              <Link 
                  href="/history"
                  className="
                      inline-flex gap-2 items-center
                      bg-lime-300 text-green-900 text-xs 
                      rounded-full px-4 py-1 font-bold
                  "
              >
                  <RiFileHistoryFill />
                  Transaction History
              </Link>
            </div>

            {menu.map(({ Icon, title, subtitle, link }, index) => (
              <Link href={link} key={index} className='inline-block relative isolate'>
                <div className='
                  flex flex-col justify-center gap-2 px-6 py-3
                  bg-transparent border-2 border-black
                  rounded-lg relative text-white
                  w-full h-full
                  peer
                '>
                  <Icon className="text-5xl" />
                  <p className="font-bold font-['Space_Grotesk'] text-lg">{title}</p>
                  <p className="font-['Public_Sans'] text-xs text-lime-400">{subtitle}</p>
                </div>
                <div className='
                  absolute top-0 left-0
                  bg-green-900 w-full h-full
                  translate-y-1 translate-x-1 
                  peer-active:translate-x-0 peer-active:translate-y-0
                  -z-[1] rounded-lg duration-200
                '></div>
              </Link>
            ))}

          </div>
        </div>
      </section>


    </main>
  )
}
