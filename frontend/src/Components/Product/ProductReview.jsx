import React, { useContext, useState } from 'react';
import axios from 'axios';
import { appContext } from '../../Context';

export default function ProductReview({ addReview, changeAddReview, product }) {
  const [numStar, setNumStar] = useState(0);
  const [review, setReview] = useState('');
  const [reviewError, setReviewError] = useState('');

  const { dispatch: dispatchContext } = useContext(appContext);
  //console.log(product);

  function addStar(e) {
    let numOfStar;
    if (e.id === 'one') {
      numOfStar = 1;
    } else if (e.id === 'two') {
      numOfStar = 2;
    } else if (e.id === 'three') {
      numOfStar = 3;
    } else if (e.id === 'foure') {
      numOfStar = 4;
    } else if (e.id === 'fife') {
      numOfStar = 5;
    }

    let stars = document.querySelectorAll('.stars i');
    stars.forEach((el, i) => {
      el.style = 'color:text-gray-300';
      if (i < numOfStar) {
        el.style = 'color:yellow';
        setNumStar(numOfStar);
      }
    });
  }

  async function addNewReview() {
    if (review === '') {
      setReviewError('enter your review');
    } else {
      const { data } = await axios.post(`/api/v1/review`, {
        rating: numStar,
        comment: review,
        productId: product._id,
      });
      if (data.success) {
        dispatchContext({
          type: 'singleProductSuccess',
          payload: data.product,
        });
        //console.log(data);
        setReview('');
        setNumStar(0);
        setReviewError('');
        changeAddReview();
      } else {
        setReviewError(data.err[0][0].message);
      }
      // console.log(data);
    }
  }

  return (
    <>
      {addReview && (
        <div className="w-11/12 absolute left-1/2 top-3/4 -translate-x-1/2 md:top-1/2">
          <div className="w-full border p-5 bg-gray-500 rounded-xl">
            <div className="flex justify-between pb-4">
              <p className="font-bold text-2xl text-gray-100">Submit Review</p>
              <i
                className="fas fa-close text-2xl cursor-pointer text-gray-100"
                onClick={changeAddReview}
              ></i>
            </div>
            <hr />
            <div className="stars flex justify-evenly py-8">
              <i
                id="one"
                className="fas fa-star text-gray-300 text-3xl cursor-pointer"
                onClick={(e) => addStar(e.currentTarget)}
              ></i>
              <i
                id="two"
                className="fas fa-star text-gray-300 text-3xl cursor-pointer"
                onClick={(e) => addStar(e.currentTarget)}
              ></i>
              <i
                id="three"
                className="fas fa-star text-gray-300 text-3xl cursor-pointer"
                onClick={(e) => addStar(e.currentTarget)}
              ></i>
              <i
                id="foure"
                className="fas fa-star text-gray-300 text-3xl cursor-pointer"
                onClick={(e) => addStar(e.currentTarget)}
              ></i>
              <i
                id="fife"
                className="fas fa-star text-gray-300 text-3xl cursor-pointer"
                onClick={(e) => addStar(e.currentTarget)}
              ></i>
            </div>
            <textarea
              className="w-full h-1/2"
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            {reviewError ? (
              <p className="text-yellow-500 font-bold text-xl">{reviewError}</p>
            ) : (
              ''
            )}
            <button
              className="bg-yellow-300 py-2 px-4 rounded-full block ml-auto mt-4 xl:w-1/3
          hover:bg-yellow-500 hover:text-white transition-all duration-500"
              onClick={addNewReview}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
