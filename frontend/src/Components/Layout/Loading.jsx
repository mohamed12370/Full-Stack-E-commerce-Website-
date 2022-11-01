import React from 'react';

export default function Loading() {
  return (
    <div
      className='flex justify-center items-center w-full h-96 pl-0 after:contents-[" "] after:block after:w-16 
    after:h-16 after:m-2 after:rounded-full after:border-[6px] after:border-yellow-400 after:animate-ping'
    ></div>
  );
}
