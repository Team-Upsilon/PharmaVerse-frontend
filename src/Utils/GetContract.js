import Web3 from "web3";
import CONSTANTS from "./Constants";
const CONTRACT_BUILD = require("./Abis.json");

export const web3 = new Web3(window.web3 && window.web3.currentProvider);

const GetContract = async () => {
 
  const AdminContract = new web3.eth.Contract(
    CONTRACT_BUILD.AdminAbi,
    CONSTANTS.MINTINGADDRESS
  );
  console.log(AdminContract);
  return {
    success: true,
    data: {
      AdminContract: { AdminContract },
      
    },
  };
};

export default GetContract;
