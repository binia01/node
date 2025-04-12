import React from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="min-h-screen  flex flex-col">
  <main className="container mx-auto py-12 flex-grow">
    {/* TIME TO TRAVEL Section */}
    <section className="relative text-center mb-16 py-16 rounded-xl overflow-hidden w-full h-100">
  {/* Background Image with Overlay */}
  <div className="absolute inset-0 z-0 w-full h-full">
    <img
      src="/images/kuriftu homepage1.jpg"  // Replace with your image path
      alt="Mountain National Park"
      className="w-full h-full object-cover"
    />
    
  </div>

  {/* Content */}
  <div className="relative z-10 px-4">
    <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg pt-8">ELEVATE YOUR KURIFTU EXPERIENCE
    </h1>
    <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
    The Kuriftu Loop unlocks exclusive access to our premium tier services - 
        from priority reservations at Kuriftu resort to personalized 
        concierge support throughout your stay.
    </p>
  </div>
</section>

    {/* POPULAR TOURS Section */}
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-black text-center  mb-8"> Your VIP Benefits Include:</h2>
      
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {/* Image 1 with Benefit */}
  <div className="text-center">
    <div className="overflow-hidden rounded-lg mb-4">
      <img
        src="/images/kuriftu1.jpg"
        alt="Premium Accommodations"
        className="w-full h-48 object-cover"
      />
    </div>
    <p className="font-medium text-black">Luxury Suite Upgrades</p>
  </div>

  {/* Image 2 with Benefit */}
  <div className="text-center">
    <div className="overflow-hidden rounded-lg mb-4">
      <img
        src="/images/kuriftu2.jpg"
        alt="Private Dining"
        className="w-full h-48 object-cover"
      />
    </div>
    <p className="font-medium text-black">Exclusive Dining Experiences</p>
  </div>

  {/* Image 3 with Benefit */}
  <div className="text-center">
    <div className="overflow-hidden rounded-lg mb-4">
      <img
        src="/images/kuriftu3.jpg"
        alt="Spa Services"
        className="w-full h-48 object-cover"
      />
    </div>
    <p className="font-medium text-black">Priority Spa Access</p>
  </div>

  {/* Image 4 with Benefit */}
  <div className="text-center">
    <div className="overflow-hidden rounded-lg mb-4">
      <img
        src="/images/kuriftu4.jpg"
        alt="Resort Activities"
        className="w-full h-48 object-cover"
      />
    </div>
    <p className="font-medium text-black">VIP Activity Reservations</p>
  </div>

</div>
    </section>

    
  </main>
</div>
    );
};

export default HomePage;