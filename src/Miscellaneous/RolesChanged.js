import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Stack,
  InputLabel,
} from "@mui/material";

const RolesChanged = () => {
  const [role, setRole] = useState("");
  const [accountId, setAccountId] = useState("");
  const [deassignId, setDeassignId] = useState("");
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: "8px",
          marginBottom: "24px",
          fontWeight: "700",
          textAlign: "left",
        }}
      >
        Assign Role
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: "700px" }}>
        <TextField
          fullWidth
          required
          label="Account ID"
          value={accountId}
          onChange={(e) => {
            setAccountId(e.target.value);
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          color="success"
        />
        <FormControl fullWidth>
          <InputLabel
            id="demo-select-small-label"
            InputLabelProps={{
              shrink: true,
            }}
            color="success"
          >
            Role
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={role}
            label="Role"
            onChange={handleChange}
            fullWidth
            color="success"
          >
            <MenuItem value="Inspector">Inspector</MenuItem>
            <MenuItem value="Manufacturer">Manufacturer</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
            <MenuItem value="Transporter">Transporter</MenuItem>
            <MenuItem value="Wholesaler">Wholesaler</MenuItem>
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" sx={{ maxWidth: "100px" }}
         disabled={!(accountId && role)}>
          Send
        </Button>
      </Stack>
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: "80px",
          marginBottom: "24px",
          fontWeight: "700",
          textAlign: "left",
        }}
      >
        Deassign Role
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: "700px" }}>
        <TextField
          required
          label="Account ID"
          value={deassignId}
          onChange={(e) => {
            setDeassignId(e.target.value);
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          color="success"
        />
        <Button color="primary" variant="contained" sx={{ maxWidth: "100px" }}
        disabled={!deassignId}>
          Send
        </Button>
      </Stack>
    </div>
  );
};

export default RolesChanged;
