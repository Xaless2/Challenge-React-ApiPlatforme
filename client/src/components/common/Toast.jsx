import React, { useEffect, useState } from 'react';

const Toast = ({ message, onConfirm, onCancel, duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onCancel]);

  return (
    <div className="fixed bottom-4 right-4 p-4  border border-gray-300 shadow-md rounded-lg bg-transparent">
      <p>{message}</p>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Oui, je confirme
        </button>
        <button
          onClick={onCancel}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
         Non, je me suis trompé
        </button>
      </div>
      <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-[5000ms]"
          style={{ width: `${(timeLeft / (duration / 1000)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
