import React from 'react';

const RedeemPopup = ({ isOpen, onClose, onRedeem }) => {
  if (!isOpen) return null;

  const handleRedeem = () => {
    // Assign 10 points on redeem. Adjust logic if needed.
    onRedeem(10);
    onClose();
  };

  const [voucherNumber, setVoucherNumber] = React.useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Redeem Points</h2>
        <p className="mb-4">Enter your voucher number to redeem points:</p>
        <input
          type="text"
          value={voucherNumber}
          onChange={(e) => setVoucherNumber(e.target.value)}
          placeholder="Voucher Number"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <button
          onClick={handleRedeem}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mr-2"
        >
          Redeem Points
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RedeemPopup;
