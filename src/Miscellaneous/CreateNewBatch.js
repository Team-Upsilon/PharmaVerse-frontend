import React, { useState } from "react";
import wholeSalerData from "../wholesaler.json";
import transporterData from "../transporterData.json";
import inspectorData from "../inspectorData.json";
import "./CreateNewBatch.css";
import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreateNewBatch = ({ jsonData }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [quantityInputs, setQuantityInputs] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleRowSelect = (medname) => {
    if (selectedRows.includes(medname)) {
      setSelectedRows(selectedRows.filter((row) => row !== medname));
      setQuantityInputs({ ...quantityInputs, [medname]: undefined });
    } else {
      setSelectedRows([...selectedRows, medname]);
      setQuantityInputs({ ...quantityInputs, [medname]: 1 }); // Initialize quantity to 1
    }
  };

  const handleQuantityChange = (medname, value) => {
    setQuantityInputs({ ...quantityInputs, [medname]: value });
  };

  const handleCreateButtonClick = () => {
    setSelectedTransporter(null); // Reset selected transporter
    setSelectedInspector(null);
    setSelectedWholesaler(null);
    setOpenDialog(true);
    // Check if entered quantity exceeds given quantity
    const selectedData = jsonData.filter((item) =>
      selectedRows.includes(item.medname)
    );
    const hasExceededQuantity = selectedData.some(
      (item) => quantityInputs[item.medname] > item.medquantity
    );

    if (hasExceededQuantity) {
      console.error("Entered quantity exceeds available quantity.");
      return;
    }

    console.log("Selected data:", selectedData);
  };

  const handleSendBatch = () => {
    setOpenDialog(false);

    //Rest of the logic
  };
  return (
    <div>
      <div class="searchBox">
        <input
          class="searchInput"
          type="text"
          name=""
          placeholder="Search something"
          value={searchValue} // Bind the value to the searchValue state
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button class="searchButton" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path
                  d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  shape-rendering="crispEdges"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_2_17"
                x="-0.418549"
                y="3.70435"
                width="29.7139"
                height="29.7139"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_17"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_17"
                  result="shape"
                ></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect
                  width="28.0702"
                  height="28.0702"
                  fill="white"
                  transform="translate(0.403503 0.526367)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Med Name</th>
            <th>Med Pic</th>
            <th>Med Desc</th>
            <th>Med Quantity</th>
            <th>Enter Quantity</th>
          </tr>
        </thead>
        <tbody>
          {jsonData
            .filter((item) =>
              item.medname.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <tr key={item.medname}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.medname)}
                    onChange={() => handleRowSelect(item.medname)}
                  />
                </td>
                <td>{item.medname}</td>
                <td>{item.medpic}</td>
                <td>{item.meddesc}</td>
                <td>{item.medquantity}</td>
                <td>
                  <input
                    type="number"
                    value={quantityInputs[item.medname] || ""}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.medname,
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!selectedRows.includes(item.medname)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="button" onClick={handleCreateButtonClick}>
          <p>Create Batch</p>
        </button>
      </div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        TransitionComponent={Transition}
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ backdropFilter: "blur(20px)" }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Batch Details
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div>
            <Typography variant="body2" color="text.secondary">
              <div style={{ marginTop: "8px", width: "100%" }}>
                <Card sx={{ marginBottom: "16px", width: "100%" }}>
                  <CardContent>
                    <Typography variant="subtitle1">
                      Choose a Transporter :{" "}
                    </Typography>

                    {transporterData.map((transporter) => (
                      <Button
                        key={transporter.id}
                        variant="outlined"
                        onClick={() => setSelectedTransporter(transporter)}
                        style={{ margin: "8px" }}
                        color="success"
                      >
                        {transporter.name}
                      </Button>
                    ))}

                    {/* Display selected transporter's information */}
                    {selectedTransporter && (
                      <Card sx={{ marginTop: "16px", width: "500px" }}>
                        <CardHeader
                          title={selectedTransporter.name}
                          subheader={selectedTransporter.address}
                        />
                      </Card>
                    )}

                    <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />

                    <Typography sx={{ marginTop: "10px" }} variant="subtitle1">
                      Choose an Inspector :{" "}
                    </Typography>

                    {inspectorData.map((inspector) => (
                      <Button
                        key={inspector.id}
                        variant="outlined"
                        onClick={() => setSelectedInspector(inspector)}
                        style={{ margin: "8px" }}
                        color="success"
                      >
                        {inspector.name}
                      </Button>
                    ))}

                    {selectedInspector && (
                      <Card sx={{ marginTop: "16px", width: "500px" }}>
                        <CardHeader
                          title={selectedInspector.name}
                          subheader={selectedInspector.address}
                        />
                      </Card>
                    )}

                    <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />

                    <Typography sx={{ marginTop: "10px" }} variant="subtitle1">
                      Choose a Wholesaler :{" "}
                    </Typography>

                    {wholeSalerData.map((wholesaler) => (
                      <Button
                        key={wholesaler.id}
                        variant="outlined"
                        onClick={() => setSelectedWholesaler(wholesaler)}
                        style={{ margin: "8px" }}
                        color="success"
                      >
                        {wholesaler.name}
                      </Button>
                    ))}

                    {selectedWholesaler && (
                      <Card sx={{ marginTop: "16px", width: "500px" }}>
                        <CardHeader
                          title={selectedWholesaler.name}
                          subheader={selectedWholesaler.address}
                        />
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Typography>
            <Divider />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {selectedTransporter && selectedInspector && selectedWholesaler && (
            <Button color="primary" autoFocus onClick={handleSendBatch}>
              Send
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

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
