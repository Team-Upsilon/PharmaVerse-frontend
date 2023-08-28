import React, { useState } from 'react'
import medicineData from '../medicine.json'
import '../Miscellaneous/ChemicalList.css';
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from '../Utils/Constants';

const MedicineList = () => {
  const { medicines } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [medicinesData, setMedicinesData] = useState(medicineData);

  // useEffect(() => {
  //   setData();
  // }, []);

  // const setData = async () => {
  //   if (!medicines || !account) return;

  //   setMedicinesData(medicines);
  // };

  return (
    <div>
      <div className='allcards' >
        {/* {medicinesData.map((medicine, index) => (
          <div className='card' key={index} style={{ cursor: "pointer", backgroundImage: `url(${CONSTANTS.IPFSURL}/${medicinesData.ipfs_hash})` }}>
            <p className="card__title">{medicine.name}</p>
            <div className="card__content">
              <p className="card__title">{medicine.name}:{medicine.totalQuantity}</p>
              <p className="card__description">{medicine.description}</p>
            </div>
          </div>
        ))} */}
        {medicinesData.map((medicine, index) => (
          <div className='card' key={index} style={{ cursor: "pointer", backgroundImage: `url(${medicine.medpic})` }}>
            <p className="card__title">{medicine.medname}</p>
            {/* <img src={medicine.medpic} height="200px" width="160px" /> */}
            <div className="card__content">
              <p className="card__title">{medicine.medname}:{medicine.medquantity}</p>
              <p className="card__description">{medicine.meddesc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MedicineList
