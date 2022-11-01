import React from 'react';

export default function Rating({ rating }) {
  if (rating === 0) {
    return (
      <>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (1 <= rating && rating < 1.5) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (1.5 <= rating && rating < 2) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star-half-alt text-yellow-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (2 <= rating && rating < 2.5) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (2.5 <= rating && rating < 3) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star-half-alt text-yellow-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (3 <= rating && rating < 3.5) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-gray-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (3.5 <= rating && rating < 4) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star-half-alt text-yellow-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (4 <= rating && rating < 4.5) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-gray-400"></i>
      </>
    );
  } else if (4.5 <= rating && rating < 5) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star-half-alt text-yellow-400"></i>
      </>
    );
  } else if (rating >= 5) {
    return (
      <>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
      </>
    );
  }
}
