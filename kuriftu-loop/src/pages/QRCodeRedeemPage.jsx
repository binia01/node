import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';

const QRCodeRedeemPage = () => {
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleRedeem = async () => {
        try {
            // Assume we have a function to validate and redeem the QR code
            const response = await fetch('/api/redeem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qrCodeValue }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Points Awarded!');
                // Optionally, redirect or update user points in the dashboard
                history.push('/dashboard');
            } else {
                setMessage(data.error || 'Redemption failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Redeem Points with QR Code</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-center">Enter QR Code Value</label>
                    <input
                        type="text"
                        placeholder="Scan or Enter Code"
                        value={qrCodeValue}
                        onChange={(e) => setQrCodeValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                    />
                </div>
                <button
                    onClick={handleRedeem}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Redeem
                </button>
                {message && <div className="text-center mt-4">{message}</div>}
            </div>
        </div>
    );
};

export default QRCodeRedeemPage;