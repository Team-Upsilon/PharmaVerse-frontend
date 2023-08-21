import React from 'react';
import jsonData from '../data.json';

const ChemicalList = () => {
  const { xaxis, quantity } = jsonData[0];

  const chartData = xaxis.map((xValue, index) => ({
    x: xValue,
    y: quantity[index],
  }));

  return (

    <div style={{ marginTop: '20px' }}>
      <h2>List of Chemicals</h2>
      {xaxis.map((qd, index) => (
        <div key={index}>{qd}</div>
      ))}
    </div>
  );
};

export default ChemicalList;
