import { useContext, useState } from 'react';
import Input from '../components/Input';

import Head from 'next/head';
import Navbar from '../components/Navbar';
import gen from "../hooks/gen";
import { useRouter } from 'next/router';
import { add_doc } from '../hooks/firebase';
import { UserContext } from '../contexts/UserContext';


export default function Home() {

  const router = useRouter();
  const [form, setForm] = useState({ 
    id: gen(16),
    trx_type: "debit",
    category: "",
    description: "",
    amount: "",
  });

  const { user } = useContext(UserContext);
  const handleSubmit = () => {
    console.log(JSON.stringify(form));

    add_doc("transactions", form.id, { ...form, uid: user?.uid })
      .then((success) => {
        console.log(success)
        setForm({ 
          id: gen(16), 
          trx_type: "debit",
          category: "",
          description: "",
          amount: "",
        })
        router.push(`/${form.id}`);
      });
  }


  return (
    <main className="min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>Add Expenses</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <Navbar text='Add Expenses' />


      <section className='py-12 space-y-6'>

        <div className=''>Choose Expenditure Category</div>
        <div className='flex flex-wrap gap-2'>
          {[
            "🛠️ Repairs",
            "📦 Restocking",
            "🍝 Food",
            "💉 Treatments/Medicine",
            "✔️ Others",
          ].map(category => (
            <div key={category} className={`
              bg-transparent px-4 py-1 border-2 rounded-full text-sm
              ${form.category === category 
                ? 'border-lime-600 bg-lime-100' 
                : 'border-neutral-100 bg-neutral-50'
              }
            `}
              onClick={() => setForm({ ...form, category })}
            >{category}</div>
          ))}
        </div>

        <Input 
          name="description"
          placeholder="What did you spend on?"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.description}
        />

        <Input 
          name="amount"
          placeholder="How much did it cost you (&#8358;)?"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.amount}
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
