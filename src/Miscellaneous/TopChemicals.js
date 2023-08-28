import React from 'react';
import jsonData from '../data.json';
import './ChemicalList.css'
import chemimg from '../Images/raul.jpg'
const TopChemicals = () => {
  if (!jsonData || jsonData.length === 0) {
    return <div>No data available.</div>;
  }
  const data = jsonData[0];

  // Creating an array of objects with x-axis and quantity
  const xAxisData = data.xaxis.map((x, index) => ({ x, quantity: data.quantity[index] }));

  // Sorting the array by quantity in descending order
  xAxisData.sort((a, b) => b.quantity - a.quantity);

  // Taking the top 3 values
  const topXAxisData = xAxisData.slice(0, 3);
  return (
    <>
      <div className='allcards' style={{ gap: "10rem" }}>
        {topXAxisData.map(item => (
          <div key={item.x}>
            <div className='card' style={{ backgroundImage: `url(${chemimg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
              <div className="card__content">
                <p className="card__title">{item.x}:{item.quantity}</p>
                <p className="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>


  );
};

export default TopChemicals;