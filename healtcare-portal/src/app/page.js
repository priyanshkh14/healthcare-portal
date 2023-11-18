import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Card from "./components/card";
import "./components/homepage.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-cover bg-no-repeat bg-center h-90vh">
        <div className="w-2/5 text-center p-10" style={{paddingTop: "100px"}}>
          <h1 className="font-Poppins text-5xl text-black-700 ">
            One Stop for all <br /> your Medical needs
          </h1>
          <p className="font-Poppins">
            This web application is a step towards providing a one-stop platform
            for better virtual healthcare in a hassle-free manner and eliminates
            any stigma associated with conventional treatment. Our aim is to
            provide relevant information about diseases and treatments and
            expanding physician’s ability to care for patients in a quick and
            accurate manner.
          </p>
          <Link href="/pharmacy">
            <button className="px-8 py-3 mt-4 font-bold bg-F49F0A rounded-full" style={{color: "blue"}}>
              Explore
            </button>
          </Link>
        </div>
        <div className="w-2/5" >
          <Image
            src="/images/healthcare-image.png"
            alt="Healthcare"
            width={500}
            height={300}
            style={{marginLeft: "80px"}}
          />
        </div>
      </div>
      <div className="mt-10 h-100vh">
        <h1 className="text-center text-3xl">Our Services</h1>
        <div className="cardContainer" style={{paddingTop: "20px", paddingBottom: "30px"}}>
          <Card
            heading="Summarised Report of Symptoms and Treatment"
            text="To receive a summarised report of your problem and possible
              treatment after answering a few questions based on the symptoms,
              use this feature. This report can be extremely helpful to the
              doctors as they will be aware of the patient’s condition and can
              diagnose accordingly."
              imageUrl="/logos/medicine.png"
              redirect="/diabetes"
          />

          <Card
            heading="Multiple Quick Diagnosis"
            text="In India, we have a huge population with chronic conditions like
              diabetes, blood pressure, cancer, heart disease, etc. Hence this
              facility will help patients to quickly monitor and diagnose their
              conditions which do not require direct consultation from doctors
              and can be managed at home."
            imageUrl="/logos/pencil.png"
            redirect="/pcos"
          />
          <Card
            heading=" Portal for Exchange of Medical Resources"
            text="This section on the website can be used to fetch or share accurate
              information about emergency medical needs like oxygen cylinder,
              blood, bed availability, and medicines."
            imageUrl="/logos/add.png"
            redirect="/depression"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
