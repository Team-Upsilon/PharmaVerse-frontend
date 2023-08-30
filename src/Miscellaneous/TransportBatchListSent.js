import React, { useState } from "react";
import batchData from "../batch.json";
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
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from "../Utils/Constants";
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
import Timeline from "./Timeline";

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
export default function TransportBatchListSent({ data }) {

  const { packages, Services, medicines } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const [batches, setBatches] = useState(batchData);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenDialog = (batch) => {
    setSelectedBatch(batch);
    setSelectedTransporter(null);
    setSelectedInspector(null);
    setSelectedWholesaler(null);
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
      {/* {data.map((batch, index) => ( */}
      {batches.map((batch, index) => (
        <Card
          sx={{ maxWidth: 363, borderRadius: "24px", borderColor: "white" }}
        >
          {/* <CardHeader title={`${batch.batchId.slice(0, 10)}..`} subheader={batch.manufacturerId} /> */}
          <CardHeader title={batch.name} subheader={batch.manufacturer_id} />
          <CardMedia
            component="img"
            height="194"
            image={batch.batchpic}
            // image={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`}
            alt="Batch"
          />
          <CardContent>

          </CardContent>
          <CardActions>
            <Stack spacing={0.2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<InfoOutlinedIcon />}
                  onClick={() => handleOpenDialog(batch)}
                  sx={{
                    borderRadius: "50px",
                    width: "345px",
                    marginBottom: "10px",
                  }}
                  color="success"
                >
                  Batch Details
                </Button>
              </Grid>

            </Stack>
          </CardActions>
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
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Batch Details
                </Typography>

              </Toolbar>
            </AppBar>

            <DialogContent>
              <Card sx={{ marginBottom: "16px", width: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    // image={`${CONSTANTS.IPFSURL}/${batch.ipfs_hash}`}
                    alt="material"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {/* Stage : {batch.stage} */}
                      Stage : 2
                    </Typography>

                    <Divider
                      sx={{ marginTop: "10px", marginBottom: "24px" }}
                    />

                    <div>
                      <Card
                        sx={{ marginBottom: "16px" }}
                      >
                        <CardHeader
                          title="Inspector"
                          subheader="0x511F0e5A8495d7c7709f905186A01751D8b3f7C8"
                        // subheader={batch.inspectorId}
                        />
                      </Card>
                    </div>
                    <div>
                      <Card
                        sx={{ marginBottom: "16px" }}
                      >
                        <CardHeader
                          title="Wholesaler"
                          subheader="0x511F0e5A8495d7c7709f905186A01751D8b3f7C8"
                        // subheader={batch.wholesalerId}
                        />
                      </Card>

                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              <div>
                <Timeline batch={batch} role={"transporter"} />
              </div>
              <Divider />
            </DialogContent>
          </Dialog>
        </Card>
      ))}
    </Fade>
  );
}
