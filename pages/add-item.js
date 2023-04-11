import { useContext, useState } from 'react';
import Input from '../components/Input';
import Radio from '../components/Radio';

import Head from 'next/head';
import Navbar from '../components/Navbar';
import { UserContext } from '../contexts/UserContext';
import { add_doc } from '../hooks/firebase';
import gen from "../hooks/gen";


export default function Home() {

  const [form, setForm] = useState({ 
    id: gen(16),
    name: "",
    type: "",
    stock: "",
    unit: "",
    price: ""
  });

  const { user } = useContext(UserContext);
  const handleSubmit = () => {
    add_doc("farm_items", form.id, { ...form, uid: user.uid })
      .then((success) => {
        setForm({ 
          id: gen(16),
          name: "",
          type: "",
          stock: "",
          unit: "",
          price: ""
        })
      });
  }

  return (
    <main className="min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>Add Item</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <Navbar text='Add Item' />


      <section className='py-12 space-y-6'>

        <div className=''>Choose Item icon</div>
        <div className='flex flex-wrap gap-2'>
          {["🐄","🐐","🐏","🦃","🐔","🐖","🐇","🦐","🐠","🥚","🥩","🥛","📦"].map(icon => (
            <div key={icon} className={`
              bg-transparent p-3 border-2 rounded-lg text-xl
              ${form.icon === icon 
                ? 'border-lime-600 bg-lime-100' 
                : 'border-neutral-100 bg-neutral-50'
              }
            `}
              onClick={() => setForm({ ...form, icon })}
            >{icon}</div>
          ))}
        </div>

        <Input 
          name="name"
          placeholder="Animal/Produce Name"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.name}
        />

        <Radio 
          name="type"
          options={["animal", "produce"]}
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.type}
        />

        <Input 
          name="stock"
          type="number"
          placeholder="How many is in stock?"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.stock}
        />

        <Input 
          name="price"
          type="number"
          placeholder="Price for an item"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.price}
        />

        <div className=''>Choose Unit of Stock e.g (kg)</div>
        <div className='flex flex-wrap gap-2'>
          {[
            "kg",
            "litre",
            "meat",
            "animal",
            "pieces",
          ].map(unit => (
            <div key={unit} className={`
              bg-transparent px-4 py-1 border-2 rounded-full text-sm
              ${form.unit === unit 
                ? 'border-lime-600 bg-lime-100' 
                : 'border-neutral-100 bg-neutral-50'
              }
            `}
              onClick={() => setForm({ ...form, unit })}
            >{unit}</div>
          ))}
        </div>

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
