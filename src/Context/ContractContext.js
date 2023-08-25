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
    const [InspectorContarct, setInspectorContarct] = useState("");
    const [InventoryContract, setInventoryContract] = useState("");
    const [ManufacturerContract, setManufacturerContact] = useState("");
    const [BatchScheduleContarct, setBatchScheduleContarct] = useState("");
    const [RealTimeMonitoringContarct, setRealTimeMonitoringContarct] = useState("");
    const [SupplierContract, setSupplierContract] = useState("");
    const [TransporterContract, setTransporterContract] = useState("");


    const [rawmaterials, setRawMaterials] = useState([]);
    const [packages, setPackages] = useState([])
    const [medicines, setMedicines] = useState([])
    const [batches, setBatches] = useState([])


    const updateContract = (data) => {
        setAdminContract(data.AdminContract.AdminContract);
        setInspectorContarct(data.InspectorContract.InspectorContract);
        setInventoryContract(data.InventoryContract.InventoryContract);
        setManufacturerContact(data.ManufacturerContract.ManufacturerContract);
        setBatchScheduleContarct(data.BatchSchedulerContract.BatchSchedulerContract);
        setRealTimeMonitoringContarct(data.RealTimeMonitoringContract.RealTimeMonitoringContract);
        setSupplierContract(data.SupplierContract.SupplierContract);
        setTransporterContract(data.TransporterContract.TransporterContract);

    };

    useEffect(() => {
        getContract();
    }, []);

    useEffect(() => {
        // fetchNfts();
    }, []);

    const getContract = async () => {
        const contractResult = await GetContract();
        console.log("contractResult", contractResult.data)
        updateContract(contractResult.data);
    };

    const Services = {
        create_raw_material: async () => {
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
        },
        get_all_raw_materials: async()=>{
            try {
                
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return;
                }
    
                
                const rawMaterialCount = await InventoryContract.materialCount();
                const rawMaterials = [];
    
                // Loop through the raw materials and fetch each one
                for (let i = 1; i <= rawMaterialCount; i++) {
                    const rawMaterial = await InventoryContract.rawMaterials(i);
                    rawMaterials.push({
                        materialId: rawMaterial[0].toNumber(),
                        name: rawMaterial[1],
                        description: rawMaterial[2],
                        ipfs_hash: rawMaterial[3],
                        quantity: rawMaterial[4].toNumber(),
                    });
                }

                setRawMaterials(rawMaterials);
    
                
                console.log("Raw Materials: ", rawMaterials);
            } catch (error) {
                console.error("Error fetching raw materials: ", error);
            }
        },

        get_all_packages: async()=>{
            try {
                // Ensure that SupplierContract is available
                if (!SupplierContract) {
                    console.error("SupplierContract not initialized");
                    return;
                }
    
                // Call the contract's view function to get the package count
                const packageCount = await SupplierContract.packageCount();
                const packageList = [];
    
                // Loop through the packages and fetch each one
                for (let i = 1; i <= packageCount; i++) {
                    const packageInfo = await SupplierContract.rawMaterialPackages(i);
                    packageList.push({
                        packageId: packageInfo[0].toNumber(),
                        description: packageInfo[1],
                        ipfs_hash: packageInfo[2],
                        manufacturerId: packageInfo[3],
                        transporterId: packageInfo[4],
                        supplierId: packageInfo[5],
                        inspectorId: packageInfo[6],
                        stage: packageInfo[7].toNumber(),
                    });
                }

                setPackages(packageList);
    
                
                setPackages(packageList);
                console.log("Packages: ", packageList);
            } catch (error) {
                console.error("Error fetching packages: ", error);
            }

        },
        get_all_medicines: async()=>{
            try {
                // Ensure that ManufacturerContract is available
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return;
                }
    
                // Call the contract's view function to get the medicine count
                const medicineCount = await ManufacturerContract.medicineCount();
                const medicineList = [];
    
                // Loop through the medicines and fetch each one
                for (let i = 1; i <= medicineCount; i++) {
                    const medicineInfo = await ManufacturerContract.medicines(i);
                    medicineList.push({
                        medicineId: medicineInfo[0].toNumber(),
                        name: medicineInfo[1],
                        description: medicineInfo[2],
                        totalQuantity: medicineInfo[3].toNumber(),
                        ipfs_hash: medicineInfo[4],
                    });
                }
    
                // Now you have the medicineList array containing all medicines
                setMedicines(medicineList);
                console.log("Medicines: ", medicineList);
            } catch (error) {
                console.error("Error fetching medicines: ", error);
            }

        },
        get_all_batches: async()=>{
            try {
                // Ensure that ManufacturerContract is available
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return;
                }
        
                // Call the contract's view function to get the total batch count
                const batchCount = await ManufacturerContract.batchCount();
        
                const batchList = [];
        
                // Loop through the batches and fetch each one
                for (let i = 1; i <= batchCount; i++) {
                    const batchInfo = await ManufacturerContract.batches(i);
                    batchList.push({
                        batchId: batchInfo[0].toNumber(),
                        medicineIds: batchInfo[1].map((id) => id.toNumber()),
                        medicineQuantities: batchInfo[2].map((qty) => qty.toNumber()),
                        manufacturerId: batchInfo[3],
                        transporterId: batchInfo[4],
                        wholesalerId: batchInfo[5],
                        manufacturingDate: new Date(batchInfo[6].toNumber() * 1000), // Convert timestamp to JavaScript Date
                        stage: batchInfo[7].toNumber(),
                        score: batchInfo[8].toNumber(),
                        idealstage1conditions: batchInfo[9].map((value) => value.toNumber()),
                        idealstage2conditions: batchInfo[10].map((value) => value.toNumber()),
                        idealpackagingconditions: batchInfo[11].map((value) => value.toNumber()),
                        inspectorId: batchInfo[12],
                        InspectionStage: batchInfo[13].toNumber(),
                    });
                }

                setBatches(batchList);
        
                // Now you have the batchList array containing all batches
                console.log("Batches: ", batchList);
            } catch (error) {
                console.error("Error fetching batches: ", error);
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
