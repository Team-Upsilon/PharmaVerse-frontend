import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import MedicineData from '../medicine.json'
import '../Miscellaneous/CreateNewBatch.css'
const CreateNewBatch = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [selectionModel, setSelectionModel] = useState([]);
  const CustomQuantityCell = ({ value, row }) => {
    const [quantity, setQuantity] = useState(value);

    const handleQuantityChange = (event) => {
      const newQuantity = parseInt(event.target.value);
      setQuantity(newQuantity);
      // You might want to update your data source (e.g., MedicineData) here too
    };
    return <input type="number" value={quantity} style={{ borderRadius: "10px" }} onChange={handleQuantityChange} />;
  };
  const submitHandler = () => {
    console.log("Selected Medicines", selectedRows);

    selectedRows.forEach((row) => {
      const selectedRowData = rows.find((rowData) => rowData.id === row);
      console.log("Selected Row Data:", selectedRowData);
    });
  }
  const handleRowSelection = (newSelection) => {
    console.log("Selected Rows", newSelection);
    // setSelectedRows([...selectedRows, newSelection]);
  };
  const columns = [
    {
      field: 'medpic',
      headerName: 'Picture',
      type: 'image',
      sortable: false,
      width: 160
    },
    { field: 'medname', headerName: 'Medicine Name', width: 230 },
    { field: 'meddesc', headerName: 'Description', width: 500 },
    {
      field: 'Quantity',
      headerName: 'Quantity',
      renderCell: CustomQuantityCell,
      width: 90,
    },

  ];

  const rows = MedicineData.map((medicine, index) => ({ ...medicine, id: index + 1 }));
  return (
    <div>
      <div class="searchBox">

        <input class="searchInput" type="text" name="" placeholder="Search something" />
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


      <div className="datagrid-container" >
        <div className="datagrid">
          <DataGrid
            rows={rows}
            columns={columns}
            selectionModel={selectionModel}
            onSelectionModelChange={handleRowSelection}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
      <button class="cta" onClick={submitHandler}>
        <span>Create Batch</span>
        <svg viewBox="0 0 13 10" height="10px" width="15px">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
    </div>

    
  )
}

// export default CreateNewBatch


// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const CreateNewBatch = () => {
//   const [selectedRows, setSelectedRows] = useState([]);

//   const handleRowSelection = (newSelection) => {
//     setSelectedRows(newSelection);
//   };
//   const columns = [
//     { field: 'medname', headerName: 'Medicine Name', width: 230 },
//     { field: 'meddesc', headerName: 'Description', width: 500 },
//   ];

//   const rows = [
//     { id: 1, medname: 'a', meddesc: 'lorem ipsum1' },
//     { id: 2, medname: 'b', meddesc: 'lorem ipsum2' },
//     { id: 3, medname: 'c', meddesc: 'lorem ipsum3' },
//     { id: 4, medname: 'd', meddesc: 'lorem ipsum4' },
//   ];

//   const submitHandler = () => {
//     console.log("Selected Rows:", selectedRows);
//   };
//   return (
//     <div>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         selectionModel={selectedRows}
//         onSelectionModelChange={handleRowSelection}
//         checkboxSelection
//       />
//       <button onClick={submitHandler}>Submit</button>
//     </div>
//   );
// }

export default CreateNewBatch;
