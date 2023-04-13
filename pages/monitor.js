import { useContext, useEffect, useRef, useState } from 'react';
import Input from '../components/Input';

import Head from 'next/head';
import Navbar from '../components/Navbar';
import gen from "../hooks/gen";
import { useRouter } from 'next/router';
import { add_doc } from '../hooks/firebase';
import { UserContext } from '../contexts/UserContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

export default function Home() {

  const { user } = useContext(UserContext);
  const chartRef = useRef(null);
  const [timeframe, setTimeframe] = useState("D");
  const [gradient, setGradient] = useState(null);

  const router = useRouter();

  function* random_income(length){
    for(let i = 0; i <= length; i++) yield Math.floor((Math.random() * 50000) + 100);
  }

  function genRandomNumber(max=100, min=0){
    return Math.floor((Math.random() * (max-min)) + min)
  }

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];

  useEffect(() => {
    if(chartRef){
      let ctx = chartRef?.current?.ctx;

      let gradient = ctx.createLinearGradient(0, 25, 0, 300);
      gradient.addColorStop(0, 'rgb(163, 230, 53, 0.7)');
      gradient.addColorStop(0.35, 'rgb(163, 230, 53, 0.2)');
      gradient.addColorStop(0.5, 'rgb(163, 230, 53, 0)');
      gradient.addColorStop(1, 'rgb(163, 230, 53, 0)');

      setGradient(gradient)
    }

  }, [chartRef])

  const chartOptions = {
    clip: false,
    responsive: true,
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: { display: false }
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Net Income',
      data: [...random_income(7)],
      borderColor: 'rgb(163 230 53)',
      backgroundColor: gradient,
      pointBackgroundColor: 'rgb(20 83 45)',
      pointBorderColor: 'rgb(163 230 53)',
      pointRadius: 3,
      tension: 0.4,
      fill: true
    }]
  }


  return (
    <main className="min-h-screen max-w-md mx-auto px-5 py-8 isolate">

      <Head>
        <title>Performance</title>
      </Head>

      <div className='
        absolute top-0 left-0 w-full h-44
        bg-gradient-to-t from-transparent to-lime-200
        -z-[1]
      '></div>

      <Navbar text='Performance' />


      <section className='py-12 divide-y'>

        <div className='mb-12 p-4 bg-green-900 from-green-900 via-green-800 to-lime-700 shadow-2xl rounded-xl'>
          <div className='text-white font-bold'>Net Income</div>

          <Line
            ref={chartRef}
            options={chartOptions}
            data={chartData}
          />

          <div className='flex justify-between gap-2'>
            {["D", "W", "M", "Y"].map(time => (
              <div className='flex justify-center'>
                <p 
                  className={`
                      inline-flex gap-2 items-center
                      ${timeframe === time ? "text-green-900 bg-lime-400" : "text-white"} 
                      rounded-full px-5 font-bold text-sm
                  `}
                  onClick={() => setTimeframe(time)}
                >
                  {time}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='py-4 space-y-1 text-xs items-center justify-between'>
            Total Animals/Produce:
            <p className='text-2xl font-bold'>
              {genRandomNumber()}
            </p>
        </div>

        <div className='py-4 space-y-1 text-xs items-center justify-between'>
            Total Sales Recorded:
            <p className='text-2xl font-bold'>
              {genRandomNumber(400)}
            </p>
        </div>

        <div className='py-4 space-y-1 text-xs items-center justify-between'>
            Total Expenses Recorded:
            <p className='text-2xl font-bold'>
            {genRandomNumber(200)}
            </p>
        </div>

        <div className='py-4 space-y-1 text-xs items-center justify-between'>
            Date Account Created:
            <p className='text-2xl font-bold'>
              {new Date().getFullYear()}
            </p>
        </div>

      </section>


    </main>
  )
}
