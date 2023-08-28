import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import CloseIcon from "@mui/icons-material/Close";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import { Button, Stack } from "@mui/material";
import ApprovalIcon from "@mui/icons-material/Approval";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddchartIcon from '@mui/icons-material/Addchart';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import BackpackIcon from '@mui/icons-material/Backpack';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
const Timeline = () => {
  const [stageOne, setStageOne] = useState(false);
  const [stageTwo, setStageTwo] = useState(false);
  const [stageThree, setStageThree] = useState(false);
  const [stageOneInspection, setStageOneInspection] = useState(false);
  const [stageTwoInspection, setStageTwoInspection] = useState(false);
  const [stageThreeInspection, setStageThreeInspection] = useState(false);

  const StageOneCompleted = () => {
    //API call


    setStageOne(true);
  };
  const StageTwoCompleted = () => {
    //API call


    setStageTwo(true);
  };
  const StageThreeCompleted = () => {
    //API call


    setStageThree(true);
  };

  const StageOneInspectionCompleted = () => {
    //API call


    setStageOneInspection(true);
  };
  const StageTwoInspectionCompleted = () => {
    //API call


    setStageTwoInspection(true);
  };
  const StageThreeInspectionCompleted = () => {
    //API call


    setStageThreeInspection(true);
  };
  
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid  rgb(16, 204, 82)" }}
        date="Date"
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        icon={<BatchPredictionIcon />}
      >
        <h3 className="vertical-timeline-element-title">Creation of Batch</h3>
        <h4 className="vertical-timeline-element-subtitle">
          Manufacturer ID : 0x122341241213dbm
        </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="Date"
        contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid rgb(233, 30, 99)" }}
        iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        icon={<ApprovalIcon />}
      >
        <h3 className="vertical-timeline-element-title">Stage-1</h3>
        <h4 className="vertical-timeline-element-subtitle">
          Manufacturer ID : 0x122341241213dbm
        </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Stack
          direction="row"
          sx={{ marginTop: "24px", justifyContent: "flex-end" }}
        >
          <Button

            sx={{ borderRadius: "50px" }}
            onClick={StageOneCompleted}
            disabled={stageOne}
            endIcon={<LibraryAddCheckIcon/>}
           
          >
            {!stageOne && <>Complete</>}
            {stageOne && <>Completed</>}
          </Button>
        </Stack>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="Date"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid rgb(33, 150, 243)" }}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<AddchartIcon />}
      >
        <h3 className="vertical-timeline-element-title">Stage-1 (INSPECTION)</h3>
        <h4 className="vertical-timeline-element-subtitle">
         Inspector ID : 0x122341241213dfgh
        </h4>
        <h4 className="vertical-timeline-element-subtitle">Grade : x (out of 10)</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Stack
          direction="row"
          sx={{ marginTop: "24px", justifyContent: "flex-end" }}
        >
          <Button
     
            sx={{ borderRadius: "50px" }} 
            onClick={StageOneInspectionCompleted}
            disabled={stageOneInspection}
            endIcon={<LibraryAddCheckIcon/>}
          >
            {!stageOneInspection && <>Do Inspection</>}
            {stageOneInspection && <>Inspected</>}
          </Button>
        </Stack>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="Date"
        contentStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid rgb(16, 204, 82)" }}
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        icon={<AddBusinessIcon />}
      >
        <h3 className="vertical-timeline-element-title">Stage-2</h3>
        <h4 className="vertical-timeline-element-subtitle">
          Manufacturer ID : 0x122341241213dbm
        </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Stack
          direction="row"
          sx={{ marginTop: "24px", justifyContent: "flex-end" }}
        >
          <Button
       
            sx={{ borderRadius: "50px" }}
            onClick={StageTwoCompleted}
            disabled={stageTwo}
            endIcon={<LibraryAddCheckIcon/>}
          >
            {!stageTwo && <>Complete</>}
            {stageTwo && <>Completed</>}
          </Button>
        </Stack>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="Date"
        contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid rgb(233, 30, 99)" }}
        iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        icon={<AdsClickIcon />}
      >
        <h3 className="vertical-timeline-element-title">
         Stage-2 (INSPECTION)
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
         Inspector ID : 0x122341241213dfgh
        </h4>
        <h4 className="vertical-timeline-element-subtitle">Grade : x (out of 10)</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Stack
          direction="row"
          sx={{ marginTop: "24px", justifyContent: "flex-end" }}
        >
          <Button
        
            sx={{ borderRadius: "50px" }} 
            onClick={StageTwoInspectionCompleted}
            disabled={stageTwoInspection}
            endIcon={<LibraryAddCheckIcon/>}
          >
            {!stageTwoInspection && <>Do Inspection</>}
            {stageTwoInspection && <>Inspected</>}
          </Button>
        </Stack>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="Date"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid  rgb(33, 150, 243)" }}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<BackpackIcon />}
      >
        <h3 className="vertical-timeline-element-title">
          Packing and Labeling 
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          Manufacturer ID : 0x122341241213dbm
        </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Stack
          direction="row"
          sx={{ marginTop: "24px", justifyContent: "flex-end" }}
        >
          <Button
         
            sx={{ borderRadius: "50px" }} 
            onClick={StageThreeCompleted}
            disabled={stageThree}
            endIcon={<LibraryAddCheckIcon/>}
          >
            {!stageThree && <>Complete</>}
            {stageThree && <>Completed</>}
          </Button>
        </Stack>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="Date"
        contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid rgb(233, 30, 99)" }}
        iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        icon={<LocalPostOfficeIcon />}
      >
        <h3 className="vertical-timeline-element-title">
          Packing and Labeling (INSPECTION)
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
         Inspector ID : 0x122341241213dfgh
        </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Stack
          direction="row"
          sx={{ marginTop: "24px", justifyContent: "flex-end" }}
        >
          <Button
          
            sx={{ borderRadius: "50px" }} 
            onClick={StageThreeInspectionCompleted}
            disabled={stageThreeInspection}
            endIcon={<LibraryAddCheckIcon/>}
          >
            {!stageThreeInspection && <>Do Inspection</>}
            {stageThreeInspection && <>Inspected</>}
          </Button>
        </Stack>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "10px solid  rgb(16, 204, 82)" }}
        icon={<AssignmentTurnedInIcon />}
      />
    </VerticalTimeline>
  );
};

export default Timeline;
