import React from "react";
import Navbar from "./Navbar";
import Card from "./card";
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// import NoteAddIcon from '@material-ui/icons/NoteAdd';
// import AssignmentIcon from '@material-ui/icons/Assignment';

const ChronicDiagnosis = () => {
  return (
    <>
      <Navbar />
      <div className="serviceContainer" style={{ marginTop: "0" }}>
        <h1 className="heading">Chronic disease Prediction</h1>
        <div className="cardContainer">
          <Card
            heading="Diabetes Prediction"
            text="This feature predicts the risks of you having diabetes after you
              have answered a few simple questions regarding your lifestyle up
              to an accuracy of 97 percent."
              imageUrl="/logos/medicine.png"
          />

          <Card
            heading="PCOS Prediction"
            text="This feature gives results of over 97 percentage accuracy on the risks of you having PCOS after you have answered a few simple questions regarding your lifestyle up to an accuracy of 97 percent."
            imageUrl="/logos/pencil.png"

          />
          <Card
            heading="Clinical Depression Prediction"
            text="This feature provides results on your risks of having clinical depression after you have answered a few simple questions regarding your lifestyle up to an accuracy of 97 percent."
            imageUrl="/logos/add.png"

          />
        </div>
      </div>
    </>
  );
};

export default ChronicDiagnosis;
