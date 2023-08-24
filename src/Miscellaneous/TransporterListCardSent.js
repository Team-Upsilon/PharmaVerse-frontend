import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import "./TransporterListCardSent.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EmojiTransportationRoundedIcon from "@mui/icons-material/EmojiTransportationRounded";
import AirplayRoundedIcon from "@mui/icons-material/AirplayRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Toolbar,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Fade } from "react-reveal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TransporterListCardSent({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [dialogType, setDialogType] = useState(""); // It can be "transporter" or "inspector"

  const handleOpenDialog = (type) => {
    setSelectedTransporter(null); // Reset selected transporter
    setDialogType(type); // Set the type of dialog (either "transporter" or "inspector")
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Fade bottom>
    <Card sx={{ maxWidth: 370, borderRadius: "24px", borderColor: "white" }}>
      <CardHeader title={data.name} subheader={data.manufacturer_id} />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Manufacturer"
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary" align="center">
  {data.inspector.map((inspector) => (
    <Typography
      key={inspector.id}
      variant="subtitle1"
      color="text.primary"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Add this line for horizontal centering
        marginBottom: "8px",
      }}
    >
      Inspector ID :
      <span
        style={{
          color: "#777",
          marginLeft: "8px",
          marginRight: "12px",
        }}
      >
        {inspector.address}
      </span>
    </Typography>
  ))}
</Typography>

      </CardContent>
      {data["send-package"] && (
        <CardActions>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<InfoOutlinedIcon />}
              onClick={() => handleOpenDialog("inspector")}
              sx={{
                borderRadius: "50px",
                width: "345px",
                marginBottom: "10px",
              }}
              color="success"
            >
              Package Details
            </Button>
          </Grid>
        </CardActions>
      )}

      {/* Dialog for Transporter Details */}
      <Dialog
        TransitionComponent={Transition}
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
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
              Package Details
            </Typography>
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
