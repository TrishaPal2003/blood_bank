import React from 'react';
import BodyImg from "../assets/blood.png";
import { FaUserFriends, FaMapMarkerAlt } from "react-icons/fa";
import { GiDropletSplash } from "react-icons/gi";


const Home = () => {
  return (
    <main >
      
      <section 
  className='relative min-h-screen bg-[url("/blood1.jpeg")] bg-cover bg-center w-full shadow-md px-5'>


        <div className="container">
          <div className="flex flex-col md:flex-row min-h-[650px] items-center justify-between">
         {/* Text container */}
        <div className='text-white max-w-[500px]'>
        <h1 className='text-5xl font-bold text-shadow'>Connect. Donate. Save Lives</h1>
        <p>Real-time blood donor platform. Free. Fast. Nationwide. An automated blood service that connects blood searchers with voluntary donors in a moment through SMS. A free service for all.</p>
        </div>

       {/* Image container */}
        <div className=' mt-4 md:mt-4'>


        <img src={BodyImg} alt="Not found" className='w-[500px]' />
         </div>
        </div>

        </div>



      <div className=' py-12  md:px-10' >
    <h2 className="text-4xl font-bold text-red-700 mb-6 text-center">What is Rokto?</h2>
    <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto ">
      Rokto is an automated blood service that connects blood searchers with voluntary donors in a moment through SMS. 
      Rokto is always a free service for all.
    </p>

    <h3 className="text-3xl font-semibold text-red-600 mb-6 text-center mt-10">Why is Rokto?</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      <div className="bg-gray-200 p-6 rounded-lg shadow hover:shadow-slate-400 ">
        <h4 className="text-xl font-bold mb-2 text-red-500">100% Automated</h4>
        <p className="text-gray-700">Seamless donor-searcher connection using SMS + Web</p>
      </div>
      <div className="bg-gray-200 p-6 rounded-lg shadow hover:shadow-slate-400">
        <h4 className="text-xl font-bold mb-2 text-red-500">Always Free</h4>
        <p className="text-gray-700">No charges — ever. Free for everyone.</p>
      </div>
      <div className="bg-gray-200 p-6 rounded-lg shadow hover:shadow-slate-400">
        <h4 className="text-xl font-bold mb-2 text-red-500">24×7 Service</h4>
        <p className="text-gray-700">Donor search and response works around the clock.</p>
      </div>
      <div className="bg-gray-200 p-6 rounded-lg shadow hover:shadow-slate-400">
        <h4 className="text-xl font-bold mb-2 text-red-500">Secure Data</h4>
        <p className="text-gray-700">All information is encrypted and protected.</p>
      </div>
    </div>

   
  </div>

  <div className="text-center mt-6">
      <a
        href="/about"
        className="inline-block bg-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-700 transition"
      >
        Learn More
      </a>
    </div>

<div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-8 mt-10">
      We're a network of
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-red-800 mb-16">
    
      <div className="bg-white shadow rounded-xl py-8 px-4 flex flex-col items-center">
        <FaUserFriends className="text-5xl mb-4 text-red-500" />
        <h3 className="text-5xl font-extrabold mb-2">0</h3>
        <p className="text-lg font-medium">Donors</p>
      </div>

     
      <div className="bg-white shadow rounded-xl py-8 px-4 flex flex-col items-center">
        <FaMapMarkerAlt className="text-5xl mb-4 text-red-500" />
        <h3 className="text-5xl font-extrabold mb-2">64</h3>
        <p className="text-lg font-medium">Districts</p>
      </div>

     
      <div className="bg-white shadow rounded-xl py-8 px-4 flex flex-col items-center">
        <GiDropletSplash className="text-5xl mb-4 text-red-500" />
        <h3 className="text-5xl font-extrabold mb-2">8</h3>
        <p className="text-lg font-medium">Blood Groups</p>
      </div>
    </div>
  </div>


    
  
      </section>


      

    </main>
  );
};

export default Home;
