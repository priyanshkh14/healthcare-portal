import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/card";

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
              redirect="/diabetes"
          />

          <Card
            heading="PCOS Prediction"
            text="This feature gives results of over 97 percentage accuracy on the risks of you having PCOS after you have answered a few simple questions regarding your lifestyle up to an accuracy of 97 percent."
            imageUrl="/logos/pencil.png"
            redirect="/pcos"
          />
          <Card
            heading="Clinical Depression Prediction"
            text="This feature provides results on your risks of having clinical depression after you have answered a few simple questions regarding your lifestyle up to an accuracy of 97 percent."
            imageUrl="/logos/add.png"
            redirect="/depression"
          />
        </div>
      </div>
    </>
  );
};

export default ChronicDiagnosis;
