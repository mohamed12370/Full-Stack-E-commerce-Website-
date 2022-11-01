import React from 'react';

export default function CheckoutSteps({ step }) {
  if (step === 'shipping') {
    return (
      <div>
        <div className="my-6 border px-4 py-6 flex justify-around items-start flex-wrap w-2/3 mx-auto">
          <p className="font-bold bg-yellow-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Shipping
          </p>
          <p className="font-bold bg-gray-400 w-fit p-4 rounded-full text-white cursor-pointer my-4 md:my-0">
            Confirm Order
          </p>
          <p className="font-bold bg-gray-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Payment
          </p>
        </div>
      </div>
    );
  } else if (step === 'confirmOrder') {
    return (
      <div>
        <div className="my-6 border px-4 py-6 flex justify-around items-start flex-wrap w-2/3 mx-auto">
          <p className="font-bold bg-yellow-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Shipping
          </p>
          <p className="font-bold bg-yellow-400 w-fit p-4 rounded-full text-white cursor-pointer my-4 md:my-0">
            Confirm Order
          </p>
          <p className="font-bold bg-gray-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Payment
          </p>
        </div>
      </div>
    );
  } else if (step === 'payment') {
    return (
      <div>
        <div className="my-6 border px-4 py-6 flex justify-around items-start flex-wrap w-2/3 mx-auto">
          <p className="font-bold bg-yellow-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Shipping
          </p>
          <p className="font-bold bg-yellow-400 w-fit p-4 rounded-full text-white cursor-pointer my-4 md:my-0">
            Confirm Order
          </p>
          <p className="font-bold bg-yellow-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Payment
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="my-6 border px-4 py-6 flex justify-around items-start flex-wrap w-2/3 mx-auto">
          <p className="font-bold bg-gray-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Shipping
          </p>
          <p className="font-bold bg-gray-400 w-fit p-4 rounded-full text-white cursor-pointer my-4 md:my-0">
            Confirm Order
          </p>
          <p className="font-bold bg-gray-400 w-fit p-4 rounded-full text-white cursor-pointer">
            Payment
          </p>
        </div>
      </div>
    );
  }
}
