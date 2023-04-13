import { useLayoutEffect, useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { get_single_doc } from '../hooks/firebase';



export default function Home() {

  const router = useRouter();
  const [trx, setTrx] = useState(null);
  
  useLayoutEffect(() => {
    if(router?.query?.id){
      (async() => {
        setTrx(await get_single_doc("transactions", router.query.id));
      })();
    }
  },[router]);


  return (
    <main className="min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>Transaction</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <Navbar text='Transaction' />


      <div className='print:flex hidden flex-col items-center pt-12'>
        <Image
          className="object-contain"
          src="/logo.png"
          width={50}
          height={50}
          alt="" 
        />
        <div className='text-2xl font-bold'>
          <strong className='text-black'>farm</strong>
          <strong className='text-black'>stock</strong>
        </div>
      </div>


      {trx?.trx_type === "credit" && <section className='py-6 divide-y'>
        
        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Transaction Type:
            <p className='text-lg font-bold'>
              Sales
            </p>
        </div>

        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Items Bought:
            <div className='pt-2 overflow-auto'>
              {trx?.items.map(({ icon, name, price, buying }, index) => (
                <div key={index} className='p-1 rounded-md'>
                  <div className='flex justify-between'>
                    <p className=''><strong>{index+1}</strong>. {icon} {name}</p>
                    <p className=''>x{buying}</p>
                    <strong className='text-lg'>
                      = &#8358;&nbsp;
                      {((Number(price) * Number(buying)) || 0).toLocaleString()}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
        </div>

        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Customer Name:
            <p className='text-lg font-bold'>
              {trx?.customer_name}
            </p>
        </div>

        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Customer Phone:
            <p className='text-lg font-bold'>
              {trx?.customer_phone}
            </p>
        </div>

        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Amount Earned:
            <p className='text-2xl font-bold text-green-500'>
              + &#8358; {Number(trx?.amount).toLocaleString()}
            </p>
        </div>

      </section>}


      {trx?.trx_type === "debit" && <section className='py-6 divide-y'>
        
        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Transaction Type:
            <p className='text-lg font-bold'>
              Expenses
            </p>
        </div>

        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Category:
            <p className='text-lg font-bold'>
              {trx?.category}
            </p>
        </div>

        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Description:
            <p className='text-lg font-bold'>
              {trx?.description}
            </p>
        </div>

        <div className='py-3 space-y-1 text-xs items-center justify-between'>
            Amount Spent:
            <p className='text-2xl font-bold text-red-600'>
              - &#8358; {Number(trx?.amount).toLocaleString()}
            </p>
        </div>

      </section>}

      {!trx &&

        <div className="py-12 flex flex-col gap-2 justify-center items-center">
          <CgSpinner className="text-lime-500 text-2xl animate-spin" />
          <p className='text-2xl text-green-900 font-bold'>Loading...</p>
        </div>

      }

      <div className='flex justify-center'>
          <p 
            className="
                inline-flex gap-2 items-center
                bg-green-900 text-lime-300 
                rounded-full px-4 py-1 font-bold
            "
            onClick={() => window.print()}
          >
              <AiFillPrinter />
              Print
          </p>
      </div>


    </main>
  )
}


// export async function getServerSideProps(context){
//   return {
//     props: await get_single_doc("transactions", context.query.id)
//   }
// }