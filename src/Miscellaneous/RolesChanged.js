import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
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
  FormHelperText,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import "react-vertical-timeline-component/style.min.css";
import CloseIcon from "@mui/icons-material/Close";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import ApprovalIcon from "@mui/icons-material/Approval";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddchartIcon from "@mui/icons-material/Addchart";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import BackpackIcon from "@mui/icons-material/Backpack";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import clsx from "clsx";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  width: 100%;
`;
const RolesChanged = () => {
  const [role, setRole] = React.useState("");
  const [accountId, setAccountId] = useState("");
  const [deassignId, setDeassignId] = useState("");
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Container>
        <StyledCard>
          <CardContent>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "8px",
                marginBottom: "24px",
                fontWeight: "700",
              }}
            >
              Assign Role
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }} // Adjust direction for responsiveness
              gap={4}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <FormControl fullWidth required>
                <Label>Account ID :</Label>
                <StyledInput
                  placeholder="Enter the Account ID..."
                  value={accountId}
                  onChange={(e) => {
                    setAccountId(e.target.value);
                  }}
                />
                <HelperText />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Assign Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Assign Role"
                  onChange={handleChange}
                >
                  <MenuItem value="Inspector">Inspector</MenuItem>
                  <MenuItem value="Manufacturer">Manufacturer</MenuItem>
                  <MenuItem value="Supplier">Supplier</MenuItem>
                  <MenuItem value="Transporter">Transporter</MenuItem>
                  <MenuItem value="Wholesaler">Wholesaler</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
          <DialogActions>
            <Button color="primary" autoFocus>
              Send
            </Button>
          </DialogActions>
        </StyledCard>
      </Container>

      <Container>
        <StyledCard>
          <CardContent>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "8px",
                marginBottom: "24px",
                fontWeight: "700",
              }}
            >
              Deassign Role
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }} // Adjust direction for responsiveness
              gap={4}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <FormControl fullWidth required>
                <Label>Account ID :</Label>
                <StyledInput
                  placeholder="Enter the Account ID..."
                  value={deassignId}
                  onChange={(e) => {
                    setDeassignId(e.target.value);
                  }}
                />
                <HelperText />
              </FormControl>
            </Stack>
          </CardContent>
          <DialogActions>
            <Button color="primary" autoFocus>
              Send
            </Button>
          </DialogActions>
        </StyledCard>
      </Container>
    </>
  );
};

export default RolesChanged;
