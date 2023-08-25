import Web3 from "web3";
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import GetContract from "../Utils/GetContract";
import { ethers } from "ethers";

export const ContractContext = createContext();

function ContractContextProvider(props) {
    let { account } = useContext(AuthContext);
    const [AdminContract, setAdminContract] = useState("");
    const [InventoryContract, setInventoryContract] = useState("");
    const [NFTS, setNFTS] = useState("");

    const updateContract = (data) => {
        setAdminContract(data.AdminContract.AdminContract);
        // setInventoryContract(data.InventoryContract.InventoryContract);
    };

    useEffect(() => {
        getContract();
    }, []);

    useEffect(() => {
        // fetchNfts();
    }, []);

    const getContract = async () => {
        const contractResult = await GetContract();
        updateContract(contractResult.data);
    };

    const Services = {
        create_raw_material: async (_hash) => {
            try {
                console.log("minting tokens");

                // const mintPrice = ethers.utils.parseEther("0.1");

                // const response = await Minting.methods.mintToken(_hash).send({
                //     from: account,
                //     value: mintPrice
                // });

                return { success: true, data: {} };
            } catch (err) {
                console.log("Error in minting token ", err);
                return { success: false, message: err.message };
            }
        }

    };
    const [state, setState] = useState({
        AdminContract: null,
        InventoryContract: null,

    });

    return (
        <ContractContext.Provider
            value={{
                ...state,
                ...{
                    updateContract,
                    Services,
                },
            }}
        >
            {props.children}
        </ContractContext.Provider>
    );
}

export default ContractContextProvider;
