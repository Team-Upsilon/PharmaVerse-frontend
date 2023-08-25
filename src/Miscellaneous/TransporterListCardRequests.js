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
  Stack,
  Toolbar,
} from "@mui/material";
import Slide from "@mui/material/Slide";
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
export default function TransporterListCardRequests({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [availability, setAvailability] = useState(
    new Array(data.chemicals.length).fill(null)
  );
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenDialog = () => {
    setSelectedTransporter(null); // Reset selected transporter
    setSelectedInspector(null);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSendPackage = () => {
    handleCloseDialog();
  };

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
      {!data["send-package"] && (
        <CardActions>
            <Stack spacing={0.2}>
            <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
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
          <Grid item xs={24} sm={6}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSendPackage}
              sx={{
                borderRadius: "50px",
                width: "345px",
                marginBottom: "10px",
              }}
              color="success"
            >
              Send Package
            </Button>
          </Grid>
          </Stack>
        </CardActions>
      )}
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
            <Button
                variant="outlined"
                endIcon={<SendIcon />}
                onClick={handleCloseDialog}
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
