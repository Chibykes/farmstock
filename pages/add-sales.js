import { useContext, useLayoutEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Input from '../components/Input';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import gen from "../hooks/gen";
import { UserContext } from '../contexts/UserContext';
import { add_doc, read_database } from '../hooks/firebase';


export default function Home() {

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ 
    id: gen(16),
    items: [],
    trx_type: "credit",
    customer_name: "",
    customer_phone: "",
    amount: ""
  });
  const [itemsBuying, setItemsBuying] = useState({});

  const handleItemsSubmit = () => {
    setForm({ ...form, items: [...form.items, itemsBuying]});
    setItemsBuying({});

  }

  const { user } = useContext(UserContext);
  const handleSubmit = () => {
    add_doc("transactions", form.id, { ...form, uid: user?.uid })
      .then((success) => {
        console.log(success)
        setForm({ 
          id: gen(16), 
          items: [],
          trx_type: "credit",
          customer_name: "",
          customer_phone: "",
          amount: ""
        })
        router.push(`/${form.id}`);
      });

  }

  useLayoutEffect(() => {
    (async() => {
      setItems(await read_database("farm_items", user?.uid));
    })();
  }, [user]);

  return (
    <main className="relative min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>Add Sales</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <Navbar text='Add Sales' />


      <section className='py-12 space-y-6'>

        <div className='space-y-1 text-xs items-center justify-between'>
            Cost of total item:
            <p className='text-2xl font-bold'>
              &#8358;&nbsp;
              {
                form.items.reduce((total, acc) => {
                  return total += ((Number(acc?.price) * Number(acc?.buying)) || 0);
                },0).toLocaleString()
              }
            </p>
        </div>

        <div className='flex justify-between'>
          <p className=''>Choose Items Bought</p>
          <p 
            className="
                inline-flex gap-2 items-center
                bg-lime-300 text-green-900 text-xs 
                rounded-full px-4 py-1 font-bold
            "
            onClick={() => setShowModal(true)}
          >
              Add Items
              <BsArrowRight />
          </p>
        </div>

        <div id='itemsBought' className='items flex gap-4 overflow-auto'>
          {form.items.map(({ icon, name, price, buying }, index) => (
            <div key={index} className='shrink-0 p-2 rounded-md bg-green-900 border-2 border-green-900 text-lime-400 space-y-3 !w-4/6 divide-y'>
              <div className='flex justify-between'>
                <p className=''><strong>{index+1}</strong>. {icon} {name}</p>
                <p className=''>x{buying}</p>
              </div>
              <p className='flex items-center justify-between text-xs text-white'>Total: 
                <strong className='text-lg text-lime-400'>
                  &#8358;&nbsp;
                  {((Number(price) * Number(buying)) || 0).toLocaleString()}
                </strong>
              </p>
            </div>
          ))}
        </div>

        <Input 
          name="customer_name"
          placeholder="Customer Name"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.customer_name}
        />

        <Input 
          name="customer_phone"
          placeholder="Customer Phone Number"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          value={form.customer_phone}
        />

        <Input
          name="amount"
          placeholder="Customer Paid"
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



      {/* Modal */}

      <div className={`fixed w-full h-[90%] ${showModal ? "bottom-0" : "-bottom-full"} left-0 bg-white p-5 duration-200 shadow-2xl space-y-4 rounded-t-2xl`}>

        <div className='flex justify-end'>
            <p 
              className="
                  inline-flex gap-2 items-center
                  bg-green-900 text-lime-300 text-xs 
                  rounded-full px-4 py-1 font-bold
              "
              onClick={() => setShowModal(false)}
            >
                <AiFillCloseCircle />
                Close
            </p>
        </div>

        <div className='space-y-1 text-xs items-center justify-between'>
            Total Items Added:
            <p className='text-2xl font-bold'>{form?.items?.length || 0}</p>
        </div>

        <div className='space-y-1 text-xs items-center justify-between'>
            Cost of current item:
            <p className='text-2xl font-bold'>
              &#8358;&nbsp;
              {((Number(itemsBuying?.price) * Number(itemsBuying?.buying)) || 0).toLocaleString()}
            </p>
        </div>
        
        <div className=''>Choose Item</div>
        <div className='flex flex-wrap gap-2'>
          {items.map(({ id, icon, name, stock, unit, price}) => (
            <div key={unit} className={`
              bg-transparent space-y-1 px-4 py-1 border-2 rounded-md text-sm
              ${itemsBuying.id === id 
                ? 'border-lime-600 bg-lime-100' 
                : 'border-neutral-100 bg-neutral-50'
              }
            `}
              onClick={() => setItemsBuying({ ...itemsBuying, id, icon, name, stock, unit, price})}
            >
              <p className='text-xl'>{icon} {name}</p>
              <p className='text-xs text-neutral-400'>Remaining: <strong className='text-black'>{stock}</strong></p>
            
            </div>
          ))}
          </div>

          <div className=''>How many?</div>
          <Input 
            name="buying"
            placeholder="How many the customer buying?"
            onChange={(e) => setItemsBuying({ ...itemsBuying, [e.target.name]: e.target.value })}
            value={itemsBuying?.buying || ""}
          />

        <div 
          className='block relative isolate'
          onClick={handleItemsSubmit}
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
          
      </div>


    </main>
  )
}
