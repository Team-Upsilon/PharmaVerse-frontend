import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  CardActionArea,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Stack,
  Toolbar,
} from "@mui/material";
import availabilityData from "../Availability.json";
import transporterData from "../transporterData.json";
import inspectorData from "../inspectorData.json";
import { Fade } from "react-reveal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function SupplierListCardRequests({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [availability, setAvailability] = useState(
    new Array(data.chemicals.length).fill(null)
  );
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDetalis, setOpenDialogDetalis] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleCheckAvailability = () => {
    setLoading(true);
  
    // Simulate an API call for availability check
    setTimeout(() => {
      const updatedAvailability = data.chemicals.map((chemical) => {
        const manufacturerName = data.name;
        const manufacturerAvailability = availabilityData.find(
          (item) => item.name === manufacturerName
        );
  
        if (manufacturerAvailability) {
          const availableQuantity = manufacturerAvailability.chemicals.find(
            (availabilityItem) => availabilityItem.name === chemical.name
          )?.quantity || 0;
          return chemical.quantity <= availableQuantity;
        } else {
          return false; // Default to false if manufacturer availability is not defined
        }
      });
      setAvailability(updatedAvailability);
      setLoading(false);
    }, 2000);
  };
  

  const handleOpenDialog = () => {
    setSelectedTransporter(null); // Reset selected transporter
    setSelectedInspector(null);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialogDetails = () => {
    setOpenDialogDetalis(true);
  };
  const handleCloseDialogDetails = () => {
    setOpenDialogDetalis(false);
  };
  const handleSendPackage = () => {
    // Place the order with the selected transporter
    console.log("Order placed with transporter:", selectedTransporter);
    console.log("Order placed with inspector:", selectedInspector);
    // Close the dialog
    handleCloseDialog();
  };

  const allChemicalsAvailable = availability.every((available) => available);

  return (
    <Fade bottom>
    <Card sx={{ maxWidth: 363, borderRadius: "24px", borderColor: "white" }}>
      <CardHeader title={data.name} subheader={data.manufacturer_id} />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Manufacturer"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.chemicals.map((chemical, index) => (
            <Typography
              key={index}
              variant="subtitle1"
              color="text.primary"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {chemical.name}
              <span
                style={{
                  color: "#777",
                  marginLeft: "8px",
                  marginRight: "12px",
                }}
              >
                {chemical.quantity} kg
              </span>
              {loading ? (
                <CircularProgress size={16} style={{ marginRight: "8px" }} />
              ) : availability[index] === null ? (
                ""
              ) : availability[index] ? (
                <CheckCircleIcon style={{ color: "green" }} />
              ) : (
                <CancelIcon style={{ color: "red" }} />
              )}
            </Typography>
          ))}
        </Typography>
      </CardContent>
      {!data["send-package"] && (
        <CardActions>
          <Stack spacing={0.2}>
            <Grid item xs={24} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<EventAvailableIcon />}
                onClick={handleCheckAvailability}
                disabled={loading}
                sx={{
                  borderRadius: "50px",
                  width: "345px",
                  marginBottom: "10px",
                }}
                color="success"
              >
                {loading ? "Checking..." : "Check Availability"}
              </Button>
            </Grid>

            <Stack direction="row" spacing={0.6}>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<InfoOutlinedIcon />}
                onClick={handleOpenDialogDetails}
                sx={{ borderRadius: "50px" }}
                color="success"
              >
                Details
              </Button>
              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                // disabled={!allChemicalsAvailable}
                onClick={handleOpenDialog}
                sx={{ borderRadius: "50px" }}
                color="success"
              >
                Send Package
              </Button>
            </Stack>
          </Stack>
        </CardActions>
      )}

      <Dialog sx={{backdropFilter: "blur(10px)"}}  TransitionComponent={Transition} open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation Details</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: "8px" }}>
            Are you sure you want to send the package?
          </DialogContentText>
          <Typography variant="subtitle1">Choose a Transporter : </Typography>

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
          <Divider sx={{ marginTop: "10px" }} />
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
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {selectedTransporter && selectedInspector && (
            <Button onClick={handleSendPackage} color="primary" autoFocus>
              Send
            </Button>
          )}
        </DialogActions>
      </Dialog>


      <Dialog
        TransitionComponent={Transition}
        fullScreen
        open={openDialogDetalis}
        onClose={handleCloseDialogDetails}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialogDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Package Details
            </Typography>
            <Button
                variant="outlined"
                endIcon={<SendIcon />}
                onClick={handleOpenDialog}
                    //  disabled={!allChemicalsAvailable}
                sx={{ borderRadius: "50px" }}
                color="success"
              >
                Send Package
              </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div>
            <Typography variant="body2" color="text.secondary">
              <div className="card-container" style={{ marginTop: "8px" }}>
                {data.chemicals.map((chemical, index) => (
                  <Card sx={{ maxWidth: 700, marginBottom: "16px" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={chemical.image}
                        alt={chemical.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {chemical.name} ({chemical.quantity} Kg)
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {chemical.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </Typography>
            <Divider />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
    </Fade>
  );
}
