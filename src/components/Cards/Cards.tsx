import React from 'react';

interface CardsProps {
  name: string;
  img: string;
  releaseDate: string;
  rating: number;
}

const Cards: React.FC<CardsProps> = ({ name, img, releaseDate, rating }) => {





  return (
    <div className="w-60 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img
        src={img}
        alt={name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">{name}</h3>
        <p className="text-gray-600 text-sm mb-1">{releaseDate}</p>
        <p className="text-yellow-600 font-semibold">Rating: {rating}/10</p>
      </div>
    </div>
  );
}

export default Cards;
