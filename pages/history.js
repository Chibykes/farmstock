import { useContext, useLayoutEffect, useState } from 'react';

import Head from 'next/head';
import Navbar from '../components/Navbar';
import { UserContext } from '../contexts/UserContext';
import { read_database } from '../hooks/firebase';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Link from 'next/link';

export default function Home() {

  const { user } = useContext(UserContext);
  const [trxs, setTrxs] = useState(null);

  useLayoutEffect(() => {
    if(user){
      read_database("transactions", user.uid)
      .then(data => {
        setTrxs(data);
      })
    }
  }, [user]);

  return (
    <main className="min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>History</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <Navbar text='History' />


      <section className='py-12 divide-y'>

        {trxs?.map(({ id, trx_type, customer_name, customer_phone, items, amount, category }, index) => (
          <Link href={`/${id}`} key={id} className='block py-2'>
            {(trx_type === "credit") && <div className='relative p-3 flex gap-3 justify-between items-center border-none border-black rounded-lg'>
                <div className='absolute top-1 left-1 grid place-content-center font-bold bg-green-900 text-lime-300 w-5 h-5 rounded-full'>{index+1}</div>
                
                <p className=''><AiOutlinePlus className="text-green-500 text-3xl" /></p>

                <div className='grow'>
                  <p className='text-lg'>{customer_name}</p>
                  <p className='text-xs text-neutral-600'>{customer_phone} • {items.length} items Bought</p>
                  <p className='text-xs text-neutral-600'>ID: {id}</p>
                </div>

                <p className='text-lg text-green-500 font-bold'>
                  + &#8358;{Number(amount).toLocaleString()}
                </p>
              </div>}
            
            {(trx_type === "debit") && <div className='relative p-3 flex gap-3 justify-between items-center border-none border-black rounded-lg'>
                <div className='absolute top-1 left-1 grid place-content-center font-bold bg-green-900 text-lime-300 w-5 h-5 rounded-full'>{index+1}</div>
                
                <p className=''><AiOutlineMinus className="text-red-600 text-3xl" /></p>

                <div className='grow'>
                  <p className='text-lg'>{category}</p>
                  <p className='text-xs text-neutral-600'>ID: {id}</p>
                </div>

              <p className='text-lg text-red-600 font-bold'>
                - &#8358;{Number(amount).toLocaleString()}
              </p>
            </div>}
          </Link>

        ))}
          


      </section>


    </main>
  )
}
