import React from 'react';


const About = () => {
  return (
    <section className="min-h-screen bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
       <div className="md:w-1/2">

       <img
        src="/aboutblood.png"
        alt=""
        className="w-full h-auto rounded-lg "
        />
  
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">About Us</h1>
          <p className="text-gray-700 text-lg mb-6">
            <span className="font-semibold">Rokto</span> is an automated blood service that connects blood searchers with voluntary donors in moments through SMS and our website. Free. Fast. Nationwide.
          </p>

          <h2 className="text-2xl font-semibold text-red-600 mb-2">Why Rokto?</h2>
          <p className="text-gray-700 mb-4">
            Though Bangladesh has over 160 million people, safe blood banks are scarce. Outside divisional towns, they’re almost nonexistent. Many accidents require urgent blood, but the communication gap between donors and seekers causes real pain. Rokto bridges this gap using the power of SMS and email—reaching even those without internet.
          </p>

          <h2 className="text-2xl font-semibold text-red-600 mb-2">Vision</h2>
          <p className="text-gray-700 mb-4">Ensuring no more death just for the need of blood.</p>

          <h2 className="text-2xl font-semibold text-red-600 mb-2">Mission</h2>
          <p className="text-gray-700 mb-4">Connecting blood searchers with voluntary donors instantly using the power of technology.</p>

          <h2 className="text-2xl font-semibold text-red-600 mb-2">Objectives</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Encouraging voluntary blood donation</li>
            <li>Creating awareness about safe blood transfer</li>
            <li>Enabling people to request blood via SMS, website, or Facebook</li>
            <li>Connecting voluntary donors via SMS and email</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
