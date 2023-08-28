import React, { useState } from "react";
import batchData from "../batch.json";
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
import AirplayRoundedIcon from "@mui/icons-material/AirplayRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
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
import clsx from "clsx";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";

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
const StyledInput = styled(Input)(
  ({ theme }) => `
  
  .${inputClasses.input} {
    width: 320px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }

    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[100]
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function InspectorBatchCardRequests() {
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
    setSelectedTransporter(null); // Reset selected transporter
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
      {batches.map((batch, index) => (
        <Card
          sx={{ maxWidth: 363, borderRadius: "24px", borderColor: "white" }}
        >
          <CardHeader title={batch.name} subheader={batch.manufacturer_id} />
          <CardMedia
            component="img"
            height="194"
            image={batch.batchpic}
            alt="Batch"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Current Stage : {batch.currentstage}
            </Typography>
          </CardContent>
          <CardActions>
            <Stack spacing={0.2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<AirplayRoundedIcon />}
                  onClick={() => handleOpenDialog(batch)}
                  sx={{
                    borderRadius: "50px",
                    width: "345px",
                    marginBottom: "10px",
                  }}
                  color="success"
                >
                  Do Inspection
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
                  Inspection Details
                </Typography>
              </Toolbar>
            </AppBar>

            <DialogContent>
              {selectedBatch && (
                <Card sx={{ marginBottom: "16px", width: "100%" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginTop: "16px", marginBottom: "24px",marginLeft:"24px" }}
                    >
                      Actual Conditions for the Batch:
                    </Typography>
                    <Stack
                      direction="row"
                      gap={1}
                      sx={{ justifyContent: "flex-start", flexWrap: "wrap",marginLeft:"24px" }}
                    >
                      <FormControl defaultValue="" required>
                        <Label>Concentration:</Label>
                        <StyledInput placeholder="Write the concentration here" />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Pressure:</Label>
                        <StyledInput placeholder="Write the pressure here" />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Density:</Label>
                        <StyledInput placeholder="Write the density here" />
                        <HelperText />
                      </FormControl>

                      <FormControl defaultValue="" required>
                        <Label>Volume:</Label>
                        <StyledInput placeholder="Write the volume here" />
                        <HelperText />
                      </FormControl>
                    </Stack>
                    <Divider sx={{ marginTop: "20px", marginBottom: "24px" }} />
                  <CardMedia
                    component="img"
                    height="140"
                    image={selectedBatch.batchpic}
                    alt="material"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Stage : {selectedBatch.currentstage}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {selectedBatch.materialname.map((e, materialIndex) => (
                        <div key={materialIndex}>
                          {e} : {selectedBatch.materialquantity[materialIndex]}{" "}
                          Kg
                        </div>
                      ))}
                    </Typography>
                    <Divider sx={{ marginTop: "10px", marginBottom: "24px" }} />

                    <div>
                      {selectedBatch &&
                        selectedBatch.inspector.map((inspector) => (
                          <Card
                            key={inspector.id}
                            sx={{ marginBottom: "16px" }}
                          >
                            <CardHeader
                              title={inspector.name}
                              subheader={inspector.address}
                            />
                          </Card>
                        ))}
                    </div>
                    <div>
                      {selectedBatch &&
                        selectedBatch.wholesaler.map((wholesaler) => (
                          <Card
                            key={wholesaler.id}
                            sx={{ marginBottom: "16px" }}
                          >
                            <CardHeader
                              title={wholesaler.name}
                              subheader={wholesaler.address}
                            />
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              <Divider />
              <div>
                <Timeline />
              </div>
              <Divider />
            </DialogContent>
          </Dialog>
        </Card>
      ))}
    </Fade>
  );
}
