import React from 'react';
import jsonData from '../data.json';

const TopChemicals = () => {
  if (!jsonData || jsonData.length === 0) {
    return <div>No data available.</div>;
  }

  const { xaxis, quantity } = jsonData[0];

  const chartData = xaxis.map((xValue, index) => ({
    x: xValue,
    y: quantity[index],
  }));

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Top Three Products</h2>
      {jsonData.map(fd => (
        fd.xaxis)
      )}
    </div>

  );
};

export default TopChemicals;
