import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../../Context';

export default function NumPages({ productsCount, count }) {
  const { dispatch } = useContext(appContext);

  const [numPage, setNumPage] = useState([]);

  useEffect(() => {
    if (productsCount && count) {
      let arr = [];
      let resulet = Math.ceil(productsCount / 4);
      for (let i = 1; i <= resulet; i++) {
        arr.push(i);
      }
      setNumPage([...arr]);
    }
  }, [count, productsCount]);

  async function getPage(e) {
    dispatch({ type: 'all_products_request' });
    const { data } = await axios.get(`/api/v1/products?page=${e}`);
    //console.log(data);
    dispatch({ type: 'all_products_success', payload: data });
  }

  return (
    <div className="w-full md:w-1/2 flex justify-center items-center mb-6 mt-auto">
      {numPage &&
        numPage.map((el, i) => (
          <p
            key={i}
            className="text-xl border p-2 bg-slate-700 text-white font-bold mx-2 cursor-pointer"
            onClick={() => getPage(el)}
          >
            {el}
          </p>
        ))}
    </div>
  );
}
