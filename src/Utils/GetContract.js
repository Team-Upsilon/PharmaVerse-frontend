import Web3 from "web3";
import CONSTANTS from "./Constants";
const CONTRACT_BUILD = require("./Abis.json");

export const web3 = new Web3(window.web3 && window.web3.currentProvider);

const GetContract = async () => {
 
  const AdminContract = new web3.eth.Contract(
    CONTRACT_BUILD.AdminAbi,
    CONSTANTS.MINTINGADDRESS
  );

  const InventoryContract = new web3.eth.Contract(
    CONTRACT_BUILD.InventoryAbi,
    CONSTANTS.INVENTORYADDRESS
  );

  const InspectorContract = new web3.eth.Contract(
    CONTRACT_BUILD.InspectorAbi,
    CONSTANTS.INSPECTORADDRESS
  );

  const ManufacturerContract = new web3.eth.Contract(
    CONTRACT_BUILD.ManufacturerAbi,
    CONSTANTS.MANUFACTURERADDRESS
  );

  const BatchSchedulerContract = new web3.eth.Contract(
    CONTRACT_BUILD.BatchSchedulerAbi,
    CONSTANTS.BATCHSCHEDULERADDRESS
  );

  const RealTimeMonitoringContract = new web3.eth.Contract(
    CONTRACT_BUILD.RealTimeMonitoringAbi,
    CONSTANTS.REALTIMEMONITORINGADDRESS
  );

  const SupplierContract = new web3.eth.Contract(
    CONTRACT_BUILD.SupplierAbi,
    CONSTANTS.SUPPLIERADDRESS
  );

  const TransporterContract = new web3.eth.Contract(
    CONTRACT_BUILD.TransporterAbi,
    CONSTANTS.TRANSPORTERADDRESS
  );


  


  console.log(AdminContract);
  return {
    success: true,
    data: {
      AdminContract: { AdminContract },
      InventoryContract: { InventoryContract },
      InspectorContract: { InspectorContract },
      ManufacturerContract: { ManufacturerContract },
      BatchSchedulerContract: { BatchSchedulerContract },
      RealTimeMonitoringContract: { RealTimeMonitoringContract }, 
      SupplierContract: { SupplierContract },
      TransporterContract: { TransporterContract },
      
    },
  };
};

export default GetContract;
