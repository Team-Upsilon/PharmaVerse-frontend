import React, { useEffect, useState } from 'react'
import medicineData from '../medicine.json'
import '../Miscellaneous/ChemicalList.css'
const MedicineList = () => {
  console.log(medicineData);
  const [medicines, setMedicines] = useState(medicineData);
  // Creating an array of objects with x-axis and quantity
  // const AllMedData = data.medname.map((x, index) => ({ x, medquantity: data.medquantity[index], medpic: data.medpic[index], meddesc: data.meddesc[index] }));
  return (
    <div>
      <div className='allcards' >
        {medicines.map((medicine, index) => (
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
