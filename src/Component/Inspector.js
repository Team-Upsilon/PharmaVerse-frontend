import React from "react";
import transporterPage from "../transporterPage.json";
import "./Supplier.css"; // Import your custom CSS file for styling
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Tab, Tabs } from "@mui/material";
import InspectorListCardRequests from "../Miscellaneous/InspectorListCardRequests";
import InspectorListCardSent from "../Miscellaneous/InspectorListCardSent";
import Logo from "../Images/logoPharma.png";
import InspectorBatchCardRequests from "../Miscellaneous/InspectorBatchCardRequests";
import InspectorBatchCardSent from "../Miscellaneous/InspectorBatchCardSent";
import { useEffect, useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";

const drawerWidth = 240;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function ResponsiveDrawer(props) {

  const { packages, Services, rawMaterials, batches, medicines } = useContext(ContractContext);
  let { account } = useContext(AuthContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [ReceivedPackageRequestData, setReceivedPackageRequestData] = React.useState([]);
  const [SentPackageRequestData, setSentPackageRequestData] = React.useState([]);
  const [ReceivedBatchRequestData, setReceivedBatchRequestData] = React.useState([]);
  const [SentBatchRequestData, setSentBatchRequestData] = React.useState([]);

  const setData = async () => {
    if (!packages || !account || !batches) return;

    const receivedRequestsPackage = packages
      .filter((item) => item.inspectorId === account && item.stage === "Delivered")
      .map((item) => {
        const materialId = item.rawMaterials[0]?.materialId; // Get the materialId from the first object
        const rawMaterial = rawMaterials.find((rm) => rm.id === materialId); // Find the raw material with matching id
        const ipfsHash = rawMaterial ? rawMaterial.ipfs_hash : ""; // Get the ipfs_hash if rawMaterial exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the package data
      });

    setReceivedPackageRequestData(receivedRequestsPackage);

    const sentRequestsPackage = packages
      .filter((item) => item.inspectorId === account && item.stage === "Inspected")
      .map((item) => {
        const materialId = item.rawMaterials[0]?.materialId; // Get the materialId from the first object
        const rawMaterial = rawMaterials.find((rm) => rm.id === materialId); // Find the raw material with matching id
        const ipfsHash = rawMaterial ? rawMaterial.ipfs_hash : ""; // Get the ipfs_hash if rawMaterial exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the package data
      });

    setSentPackageRequestData(sentRequestsPackage);

    const sentRequestsBatch = batches
      .filter((item) => item.inspectorId === account && item.stage === "Packaging" && item.InspectionStage !== "STAGE_0")
      .map((item) => {
        const medicineId = item.medicines[0]?.materialId; // Get the materialId from the first object
        const medicine = medicines.find((rm) => rm.id === medicineId); // Find the medicine with matching id
        const ipfsHash = medicine ? medicine.ipfs_hash : ""; // Get the ipfs_hash if medicine exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the batch data
      });

    setReceivedBatchRequestData(sentRequestsBatch);

    const receivedRequestsBatch = batches
      .filter((item) => item.inspectorId === account && item.InspectionStage === "STAGE_3")
      .map((item) => {
        const medicineId = item.medicines[0]?.materialId; // Get the materialId from the first object
        const medicine = medicines.find((rm) => rm.id === medicineId); // Find the medicine with matching id
        const ipfsHash = medicine ? medicine.ipfs_hash : ""; // Get the ipfs_hash if medicine exists

        return { ...item, ipfs_hash: ipfsHash }; // Merge ipfs_hash into the batch data
      });

  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <img
          src={Logo}
          alt="Logo"
          width={"200rem"}
          height={"50rem"}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
      </div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            "& .MuiTabs-indicator": {
              backgroundColor: "green",
            },
          }}
        >
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Package Requests"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Inspected Packages"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Batch Requests"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                color: "green",
              },
            }}
            label="Inspected Batches"
            {...a11yProps(3)}
          />

        </Tabs>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, backgroundColor: "#121212" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          <TabPanel value={value} index={0}>
            <div className="card-container">
              {transporterPage
                .filter((data) => !data["send-package"])
                .map((data, index) => (
                  <InspectorListCardRequests key={index} data={data} />
                ))}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="card-container">
              {transporterPage
                .filter((data) => data["send-package"])
                .map((data, index) => (
                  <InspectorListCardSent key={index} data={data} />
                ))}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="card-container">
              <InspectorBatchCardRequests data={ReceivedBatchRequestData} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="card-container">
              <InspectorBatchCardSent data = {SentBatchRequestData} />
            </div>
          </TabPanel>
        </Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
