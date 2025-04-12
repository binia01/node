// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../firebase/firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { Gift, Star, Users2 } from 'lucide-react'; // Import icons used in the new UI
// import rewards from '../data/rewards.json';

// const tierThresholds = {
//   Explorer: 0,
//   Voyager: 100,
//   Ambassador: 300,
//   Elite: 500,
// };

// function DashboardPage() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         if (auth.currentUser) {
//           const userDocRef = doc(db, 'users', auth.currentUser.uid);
//           const docSnap = await getDoc(userDocRef);

//           if (docSnap.exists()) {
//             setUserData(docSnap.data());
//           } else {
//             setError('Could not find user data.');
//           }
//         } else {
//           setError('No user logged in.');
//         }
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//         setError('Failed to load user data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const getCurrentTier = (points) => {
//     let currentTier = 'Explorer';
//     for (const tier in tierThresholds) {
//       if (points >= tierThresholds[tier]) {
//         currentTier = tier;
//       } else {
//         break;
//       }
//     }
//     return currentTier;
//   };

//   const getNextTierInfo = (points) => {
//     const currentTier = getCurrentTier(points);
//     const tiers = Object.keys(tierThresholds);
//     const currentTierIndex = tiers.indexOf(currentTier);
//     if (currentTierIndex < tiers.length - 1) {
//       const nextTier = tiers[currentTierIndex + 1];
//       const pointsNeeded = tierThresholds[nextTier] - points;
//       return { nextTier, pointsNeeded };
//     }
//     return { nextTier: 'Reached Max Tier', pointsNeeded: 0 };
//   };

//   if (loading) {
//     return <div>Loading dashboard...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (userData) {
//     const currentTier = getCurrentTier(userData.points);
//     const nextTierInfo = getNextTierInfo(userData.points);

//     // Filter rewards based on their type
//     const availableRewards = rewards.rewards.filter(reward => {
//       if (reward.type === 'tier') {
//         return currentTier === reward.tierLevel;
//       } else if (reward.type === 'point') {
//         return userData.points >= (reward.pointsNeeded || 0);
//       }
//       return false; // If the reward has an unknown type, don't show it
//     });

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4">
//         <div className="container mx-auto">
//           <h1 className="text-4xl font-bold text-center text-green-700 mb-10">🌿 User Dashboard</h1>
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Left Section - User Info */}
//             <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-green-100">
//               {/* Profile Header */}
//               <div className="flex items-center gap-4 mb-6">
//                 <img
//                   src={auth.currentUser.photoURL || '/default-avatar.png'}
//                   alt="User Avatar"
//                   className="w-16 h-16 rounded-full border-2 border-green-400 object-cover"
//                 />
//                 <div>
//                   <h2 className="text-2xl font-semibold text-green-800">
//                     {auth.currentUser.displayName || 'Guest User'}
//                   </h2>
//                   <p className="text-sm text-gray-500">Welcome back!</p>
//                 </div>
//               </div>

//               {/* Points and Tier */}
//               <div className="mb-6">
//                 <p className="text-gray-700 mb-2">
//                   Current Points: <span className="font-bold text-green-600">{userData.points}</span>
//                 </p>
//                 <div className="w-full bg-green-100 h-3 rounded-full mb-2">
//                   <div
//                     className="bg-green-500 h-3 rounded-full"
//                     style={{ width: `${Math.min((userData.points / 1000) * 100, 100)}%` }}
//                   />
//                 </div>
//                 <p className="text-gray-700">
//                   Tier: <span className="font-bold text-green-500">{currentTier}</span>
//                 </p>
//               </div>

//               {/* Badges & Achievements */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Star className="text-yellow-500" size={20} />
//                   <h3 className="text-lg font-semibold text-green-700">Badges & Achievements</h3>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🌱 Newbie</span>
//                   <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-medium">🔥 Streak 7 Days</span>
//                   <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">⭐ Top 10%</span>
//                 </div>
//               </div>

//               {/* Referrals */}
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Users2 className="text-green-600" size={20} />
//                   <h3 className="text-lg font-semibold text-green-700">Referrals</h3>
//                 </div>
//                 <p className="text-gray-600 mb-2">
//                   You’ve referred <span className="font-semibold text-green-700">3 friends</span>. Keep going!
//                 </p>
//                 <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm transition">
//                   📩 Invite More Friends
//                 </button>
//               </div>
//             </div>

//             {/* Right Section - Rewards */}
//             <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-green-100">
//               <div className="flex items-center gap-2 mb-4">
//                 <Gift className="text-green-600" size={24} />
//                 <h2 className="text-2xl font-semibold text-green-800">Available Rewards</h2>
//               </div>

//               {/* Display Available Rewards */}
//               <div className="space-y-4">
//                 {availableRewards.length > 0 ? (
//                   availableRewards.map(reward => (
//                     <div key={reward.id} className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
//                       <div>
//                         <p className="text-green-800 font-medium">{reward.name}</p>
//                         <p className="text-sm text-gray-500">{reward.description}</p>
//                         {reward.type === 'point' && reward.pointsNeeded > 0 && (
//                           <p className="text-red-500 font-semibold mt-1">Points: {reward.pointsNeeded}</p>
//                         )}
//                         {reward.type === 'tier' && (
//                           <p className="text-blue-500 font-semibold mt-1">Requires: {reward.tierLevel} Tier</p>
//                         )}
//                       </div>
//                       <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
//                         Claim
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No rewards available based on your tier and points.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }

// export default DashboardPage;

import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { Gift, Star, Users2 } from 'lucide-react'; // Import icons used in the new UI
import rewards from '../data/rewards.json';
import { useNavigate } from 'react-router-dom';

const tierThresholds = {
  Explorer: 0,
  Voyager: 100,
  Ambassador: 300,
  Elite: 500,
};

function DashboardPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claimError, setClaimError] = useState('');
  const [claimSuccess, setClaimSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        if (auth.currentUser) {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setError('Could not find user data.');
          }
        } else {
          setError('No user logged in.');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getCurrentTier = (points) => {
    let currentTier = 'Explorer';
    for (const tier in tierThresholds) {
      if (points >= tierThresholds[tier]) {
        currentTier = tier;
      } else {
        break;
      }
    }
    return currentTier;
  };

  const getNextTierInfo = (points) => {
    const currentTier = getCurrentTier(points);
    const tiers = Object.keys(tierThresholds);
    const currentTierIndex = tiers.indexOf(currentTier);
    if (currentTierIndex < tiers.length - 1) {
      const nextTier = tiers[currentTierIndex + 1];
      const pointsNeeded = tierThresholds[nextTier] - points;
      return { nextTier, pointsNeeded };
    }
    return { nextTier: 'Reached Max Tier', pointsNeeded: 0 };
  };

  const handleClaimReward = async (reward) => {
    setClaimError('');
    setClaimSuccess('');

    if (!userData) {
      setClaimError('User data not loaded.');
      return;
    }

    const currentTier = getCurrentTier(userData.points);

    if (reward.type === 'tier' && currentTier !== reward.tierLevel) {
      setClaimError(`You need to be at least the ${reward.tierLevel} tier to claim this reward.`);
      return;
    }

    if (reward.type === 'point' && userData.points < (reward.pointsNeeded || 0)) {
      setClaimError('Not enough points to claim this reward.');
      return;
    }

    try {
      // Handle point deduction for point-based rewards
      if (reward.type === 'point' && reward.pointsNeeded > 0) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, {
          points: userData.points - reward.pointsNeeded,
        });
        setUserData({ ...userData, points: userData.points - reward.pointsNeeded });
      }

      // Record the redemption
      const redemptionsCollection = collection(db, 'redemptions');
      await addDoc(redemptionsCollection, {
        userId: auth.currentUser.uid,
        rewardId: reward.id,
        rewardName: reward.name,
        rewardType: reward.type,
        pointsCost: reward.pointsNeeded || 0,
        tierRequired: reward.tierLevel || null,
        redeemedAt: new Date(),
      });

      setClaimSuccess(`Successfully claimed '${reward.name}'!`);
      // navigate('/voucher-input'); // Or /feedback, depending on the reward
    } catch (err) {
      console.error('Error claiming reward:', err);
      setClaimError('Failed to claim reward. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (userData) {
    const currentTier = getCurrentTier(userData.points);
    const nextTierInfo = getNextTierInfo(userData.points);

    // Filter rewards based on their type
    const availableRewards = rewards.rewards.filter(reward => {
      if (reward.type === 'tier') {
        return currentTier === reward.tierLevel;
      } else if (reward.type === 'point') {
        return userData.points >= (reward.pointsNeeded || 0);
      }
      return false; // If the reward has an unknown type, don't show it
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-green-700 mb-10">🌿 User Dashboard</h1>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section - User Info */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={auth.currentUser.photoURL || '/default-avatar.png'}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full border-2 border-green-400 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-green-800">
                    {auth.currentUser.displayName || 'Guest User'}
                  </h2>
                  <p className="text-sm text-gray-500">Welcome back!</p>
                </div>
              </div>

              {/* Points and Tier */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Current Points: <span className="font-bold text-green-600">{userData.points}</span>
                </p>
                <div className="w-full bg-green-100 h-3 rounded-full mb-2">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${Math.min((userData.points / 1000) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-gray-700">
                  Tier: <span className="font-bold text-green-500">{currentTier}</span>
                </p>
              </div>

              {/* Badges & Achievements */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-yellow-500" size={20} />
                  <h3 className="text-lg font-semibold text-green-700">Badges & Achievements</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🌱 Newbie</span>
                  <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-medium">🔥 Streak 7 Days</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">⭐ Top 10%</span>
                </div>
              </div>

              {/* Referrals */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users2 className="text-green-600" size={20} />
                  <h3 className="text-lg font-semibold text-green-700">Referrals</h3>
                </div>
                <p className="text-gray-600 mb-2">
                  You’ve referred <span className="font-semibold text-green-700">3 friends</span>. Keep going!
                </p>
                <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm transition">
                  📩 Invite More Friends
                </button>
              </div>
            </div>

            {/* Right Section - Rewards */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="text-green-600" size={24} />
                <h2 className="text-2xl font-semibold text-green-800">Available Rewards</h2>
              </div>

              {claimError && <p className="text-red-500 mb-2">{claimError}</p>}
              {claimSuccess && <p className="text-green-500 mb-2">{claimSuccess}</p>}

              {/* Display Available Rewards */}
              <div className="space-y-4">
                {availableRewards.length > 0 ? (
                  availableRewards.map(reward => (
                    <div key={reward.id} className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                      <div>
                        <p className="text-green-800 font-medium">{reward.name}</p>
                        <p className="text-sm text-gray-500">{reward.description}</p>
                        {reward.type === 'point' && reward.pointsNeeded > 0 && (
                          <p className="text-red-500 font-semibold mt-1">Points: {reward.pointsNeeded}</p>
                        )}
                        {reward.type === 'tier' && (
                          <p className="text-blue-500 font-semibold mt-1">Requires: {reward.tierLevel} Tier</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleClaimReward(reward)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Claim
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No rewards available based on your tier and points.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default DashboardPage;