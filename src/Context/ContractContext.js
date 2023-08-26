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
    const [packagereports, setPackageReports] = useState([])
    const [batchreports, setBatchReports] = useState([])
    const [packagedeliverdetails,setpackagedeliverdetails]=useState([])
    const [batchdeliverdetails,setbatchdeliverdetails]=useState([])


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
        },
        create_raw_material: async(name, description, ipfs_hash, quantity)=>{
            try {
                
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return { success: false, message: "InventoryContract not initialized" };
                }
        
                
                const response = await InventoryContract.addRawMaterial(name, description, ipfs_hash, quantity, {
                    from: account, // suppliers address
                });
        
            
                if (response.status) {
                    console.log("Raw material created successfully");
                    return { success: true, message: "Raw material created successfully" };
                } else {
                   
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error creating raw material: ", error);
                return { success: false, message: error.message };
            }
        },
        create_medicine: async (name, description, ipfs_hash)=>{
            try {
               
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return { success: false, message: "ManufacturerContract not initialized" };
                }
        
                
                const response = await ManufacturerContract.createMedicine(name, description, ipfs_hash, {
                    from: account, 
                });
        
                
                if (response.status) {
                    
                    console.log("Medicine created successfully");
                    return { success: true, message: "Medicine created successfully" };
                } else {
                    
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error creating medicine: ", error);
                return { success: false, message: error.message };
            }

        },

        check_availibity: async (materialId, desiredQuantity)=>{
            try {
                
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return { success: false, message: "InventoryContract not initialized" };
                }
        
                
                const availability = await InventoryContract.checkAvailability(materialId, desiredQuantity, {
                    from: account,
                });
        
                
                if (availability > 0) {
                    console.log(`Raw material with ID ${materialId} is available in the desired quantity: ${availability}`);
                    return { success: true, message: `Raw material available in quantity: ${availability}` };
                } else {
                    console.log(`Raw material with ID ${materialId} is not available in the desired quantity.`);
                    return { success: false, message: `Raw material not available in the desired quantity.` };
                }
            } catch (error) {
                console.error("Error checking availability: ", error);
                return { success: false, message: error.message };
            }
        },
        increase_quantity: async (materialId, additionalQuantity)=>{
            try {
                
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return { success: false, message: "InventoryContract not initialized" };
                }
        
                
                const response = await InventoryContract.increaseQuantity(materialId, additionalQuantity, {
                    from: account,
                });
        
                
                if (response.status) {
                    console.log(`Quantity increased successfully for material with ID ${materialId}`);
                    return { success: true, message: `Quantity increased successfully for material with ID ${materialId}` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error increasing quantity: ", error);
                return { success: false, message: error.message };
            }
        },
        update_raw_materials : async (materialId, name, description, ipfs_hash, quantity)=>{
            try{
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return { success: false, message: "InventoryContract not initialized" };
                }
        
                
                const response = await InventoryContract.updateRawMaterial(materialId, name, description, ipfs_hash, quantity, {
                    from: account,
                });
        
                
                if (response.status) {
                    console.log(`Raw material with ID ${materialId} updated successfully`);
                    return { success: true, message: `Raw material with ID ${materialId} updated successfully` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            }catch(error){
                console.error("Error updating raw material: ", error);
                return { success: false, message: error.message };
            }
        },
        update_package_state: async (packageId, newStage)=>{
            try {
                
                if (!SupplierContract) {
                    console.error("SupplierContract not initialized");
                    return { success: false, message: "SupplierContract not initialized" };
                }
        
               
                const response = await SupplierContract.updatePackageStage(packageId, newStage, {
                    from: account, 
                });
        
                
                if (response.status) {
                    console.log(`Package with ID ${packageId} stage updated successfully to ${newStage}`);
                    return { success: true, message: `Package stage updated successfully to ${newStage}` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error updating package stage: ", error);
                return { success: false, message: error.message };
            }
        },
        update_batch_state: async (batchId, newStage)=>{
            try{
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return { success: false, message: "ManufacturerContract not initialized" };
                }
        
                
                const response = await ManufacturerContract.updateBatchStage(batchId, newStage, {
                    from: account,
                });
        
                
                if (response.status) {
                    console.log(`Batch with ID ${batchId} stage updated successfully to ${newStage}`);
                    return { success: true, message: `Batch stage updated successfully to ${newStage}` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            }
            catch(error){
                console.error("Error updating batch stage: ", error);
                return { success: false, message: error.message };
            }
        },
        record_package_delivery: async (packageId)=>{
            try {
                
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return { success: false, message: "TransporterContract not initialized" };
                }
        
                
                const response = await TransporterContract.recordPackageDelivery(packageId, {
                    from: account,
                });
        
                if (response.status) {
                    console.log(`Package with ID ${packageId} delivery recorded successfully`);
                    return { success: true, message: `Package delivery recorded successfully` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error recording package delivery: ", error);
                return { success: false, message: error.message };
            }
        },
        record_batch_delivery: async (batchId)=>{
            try{
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return { success: false, message: "TransporterContract not initialized" };
                }
        
                
                const response = await TransporterContract.recordBatchDelivery(batchId, {
                    from: account,
                });
        
                
                if (response.status) {
                    console.log(`Batch with ID ${batchId} delivery recorded successfully`);
                    return { success: true, message: `Batch delivery recorded successfully` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            }catch(error){
                console.error("Error recording batch delivery: ", error);
                return { success: false, message: error.message };
            }
        },
        check_quality: async (packageId, description, quantityArray, concentrationArray)=>{
            try {
                if (!InspectorContarct) {
                    console.error("InspectorContract not initialized");
                    return { success: false, message: "InspectorContract not initialized" };
                }
        
               
                const quantity = quantityArray.map((value) => ethers.BigNumber.from(value));
                const concentration = concentrationArray.map((value) => ethers.BigNumber.from(value));
        
                const response = await InspectorContarct.checkquality(packageId, description, quantity, concentration, {
                    from: account,
                });
        
                if (response.status) {
                    console.log(`Quality checked for package with ID ${packageId}`);
                    return { success: true, message: `Quality checked for package with ID ${packageId}` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error checking quality: ", error);
                return { success: false, message: error.message };
            }
        },
        get_package_reports : async(packageId)=>{
            try {
                if (!InspectorContarct) {
                    console.error("InspectorContract not initialized");
                    return [];
                }
        
                const packageReports = await InspectorContarct.packageReports(packageId);
        
                
                const formattedPackageReports = packageReports.map((report) => ({
                    packageid: report.packageid.toNumber(),
                    description: report.description,
                    grade: report.grade.toNumber(),
                    timestamp: report.timestamp.toNumber(),
                    inspectorId: report.inspectorId,
                    isApproved: report.isApproved,
                }));
                setPackageReports(formattedPackageReports)
        
                console.log("Package Reports for Package ID", packageId, ":", formattedPackageReports);
                return formattedPackageReports;
            } catch (error) {
                console.error("Error fetching package reports: ", error);
                return [];
            }
        },
        get_batch_reports: async (batchId)=>{
            try {
                
                if (!RealTimeMonitoringContarct) {
                    console.error("RealTimeMonitoringContract not initialized");
                    return [];
                }
        
               
                const batchReports = await RealTimeMonitoringContarct.batchReports(batchId);
        
                
                const formattedBatchReports = batchReports.map((report) => ({
                    batchId: report.batchId.toNumber(),
                    stage: report.stage.toNumber(),
                    batchReportResult: report.batchReportResult.toNumber(),
                }));
                setBatchReports(formattedBatchReports)
        
               
                console.log("Batch Reports for Batch ID", batchId, ":", formattedBatchReports);
                return formattedBatchReports;
            } catch (error) {
                console.error("Error fetching batch reports: ", error);
                return [];
            }
        },
        get_packagedelivery_details : async (packageId)=>{
            try{
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return null
                }

                const deliveryDetails = await TransporterContract.packageDeliveries(packageId);
                if(deliveryDetails[0].toNumber() === 0){
                    console.log("Package with ID", packageId, "has not been delivered yet");
                    return null;
                }

                const formattedDeliveryDetails = {
                    packageId: deliveryDetails[0].toNumber(),
                    supplierId: deliveryDetails[1],
                    transporterId: deliveryDetails[2],
                    deliveryTime: new Date(deliveryDetails[3].toNumber() * 1000),
                };
                console.log("Delivery details for package ID", packageId, ":", formattedDeliveryDetails);
                setpackagedeliverdetails(formattedDeliveryDetails)
                return formattedDeliveryDetails;
            }catch(error){
                console.error("Error fetching package delivery details: ", error);
                return null;
            }  
        },
        get_batchdelivery_details : async (batchId)=>{
            try{
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return null
                }

                const deliveryDetails = await TransporterContract.batchDeliveries(batchId);
                if(deliveryDetails[0].toNumber() === 0){
                    console.log("Batch with ID", batchId, "has not been delivered yet");
                    return null;
                }

                const formattedDeliveryDetails = {
                    batchId: deliveryDetails[0].toNumber(),
                    manufacturerId: deliveryDetails[1],
                    transporterId: deliveryDetails[2],
                    deliveryTime: new Date(deliveryDetails[3].toNumber() * 1000),
                };
                console.log("Delivery details for batch ID", batchId, ":", formattedDeliveryDetails);
                setbatchdeliverdetails(formattedDeliveryDetails)
                return formattedDeliveryDetails;
            }catch(error){
                console.error("Error fetching batch delivery details: ", error);
                return null;
            }  
        },
        record_batch_report:async (batchId, stage, stagecondition)=>{
            try {
               
                if (!RealTimeMonitoringContarct) {
                    console.error("RealTimeMonitoringContract not initialized");
                    return { success: false, message: "RealTimeMonitoringContract not initialized" };
                }
        
               
                const response = await RealTimeMonitoringContarct.recordBatchReport(
                    batchId,
                    stage,
                    stagecondition,
                    {
                        from: account,
                    }
                );
        
                if (response.status) {
                    console.log(`Batch report recorded successfully for Batch ID ${batchId}`);
                    return { success: true, message: `Batch report recorded successfully` };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error recording batch report: ", error);
                return { success: false, message: error.message };
            }
        },
        create_rawmaterial_package: async (
            description,
            ipfs_hash,
            manufacturerId,
            transporterId,
            inspectorId)=>{

                try {
                    if (!SupplierContract) {
                        console.error("SupplierContract not initialized");
                        return { success: false, message: "SupplierContract not initialized" };
                    }
            
                    const response = await SupplierContract.createRawMaterialPackage(
                        description,
                        ipfs_hash,
                        manufacturerId,
                        transporterId,
                        inspectorId,
                        {
                            from: account, 
                        }
                    );
            
                    if (response.status) {
                        console.log("Raw material package created successfully");
                        return { success: true, message: "Raw material package created successfully" };
                    } else {
                        console.error("Transaction failed");
                        return { success: false, message: "Transaction failed" };
                    }
                } catch (error) {
                    console.error("Error creating raw material package: ", error);
                    return { success: false, message: error.message };
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
