import React, { useState } from 'react';
import jsonData from '../data.json';
import './ChemicalList.css';
import chemimg from '../Images/raul.jpg'
import { Button, Icon } from '@mui/material';
const ChemicalList = () => {
  const data = jsonData[0];

  // Creating an array of objects with x-axis and quantity
  const xAxisData = data.xaxis.map((x, index) => ({ x, quantity: data.quantity[index] }));
  const [d, setD] = useState(jsonData);
  const [searchValue, setSearchValue] = useState("");
  const [enableUpdate, setEnableUpdate] = useState(false);
  const increaseQuantity = (index) => {
    const newData = [...d];
    newData[0].quantity[index] += 1;
    setD(newData);
  };
  return (
    <div className="chemical-list">
      <div class="searchBox">

        <input class="searchInput" type="text" name="" placeholder="Search something"
          value={searchValue} // Bind the value to the searchValue state
          onChange={(e) => setSearchValue(e.target.value)} />
        <button class="searchButton" href="#">



          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
              </g>
            </g>
            <defs>
              <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
              </clipPath>
            </defs>
          </svg>


        </button>
      </div>
      <div className="allcards">
        {xAxisData.filter((qd) => qd.x.toLowerCase().includes(searchValue.toLowerCase())).map((qd) => (
          <div className='card' key={qd.x} style={{ backgroundImage: `url(${chemimg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >
            <p className="card__title">{qd.x}</p>
            {/* <img src={chemimg} alt="" height="200px" width="160px" /> */}
            <div className="card__content">
              <p className="card__title">{qd.x}:{qd.quantity}</p>
              <p className="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            </div>

          </div>
        ))}
        <h1>increment</h1>
        {xAxisData.map((item, index) => (
          <div key={item.x}>
            <p>{item.x}</p>
            <p>{item.quantity}</p>
            <p>
              <button onClick={() => {
                increaseQuantity(index)
                setEnableUpdate(true)
              }}>+</button>
            </p>
          </div>
        ))}
        <Button
          variant='contained'
          disabled={!enableUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default ChemicalList;