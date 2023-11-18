import React from "react";
import Navbar from "./Navbar";
import Link from 'next/link';
import Image from 'next/image';
import healthcare from '../images/healthcare-image.png';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-cover bg-no-repeat bg-center h-90vh" style={{ backgroundImage: `url(${healthcare})` }}>
        <div className="w-28%">
          <h1 className="font-Poppins text-35px text-white">One Stop for all <br /> your Medical needs</h1>
          <p className="font-Poppins text-white">This web application is a step towards providing a one-stop platform for better virtual healthcare in a hassle-free manner and eliminates any stigma associated with conventional treatment. Our aim is to provide relevant information about diseases and treatments and expanding physician’s ability to care for patients in a quick and accurate manner.</p>
          <Link href='/pharmacy'>
            <a><button className="px-10 py-3 w-200px text-white font-bold text-medium bg-F49F0A rounded-full">Explore</button></a>
          </Link>
        </div>
        <div className="w-600px">
          <Image src={healthcare} alt="Healthcare" />
        </div>
      </div>
      <div className="mt-10 h-100vh">
        <h1 className="text-center text-3xl">Our Services</h1>
        <hr className="mx-auto my-5 w-20% bg-F49F0A border-3" />
        <div className='flex justify-center items-stretch flex-row py-10'>
          <div className="bg-EAF2FF w-28 ml-20px p-30px flex items-center flex-col shadow-box">
            <div className="h-50px w-50px bg-00A6A6 rounded-full mb-20px flex justify-center items-center text-white">
              <LocalHospitalIcon size="large" />
            </div>
            <h5 style={{ fontSize: '18px', color: '#F49F0A' }} className="text-center text-18px text-F49F0A">Summarised Report of Symptoms and Treatment</h5>
            <p className="text-center">To receive a summarised report of your problem and possible treatment after answering a few questions based on the symptoms, use this feature. This report can be extremely helpful to the doctors as they will be aware of the patient’s condition and can diagnose accordingly.</p>
          </div>
          <div className="bg-EAF2FF w-28 ml-20px p-30px flex items-center flex-col shadow-box">
            <div className="h-50px w-50px bg-00A6A6 rounded-full mb-20px flex justify-center items-center text-white">
              <AssignmentIcon />
            </div>
            <h5 style={{ fontSize: '18px', color: '#F49F0A' }} className="text-center text-18px text-F49F0A">Multiple Quick Diagnosis</h5>
            <p className="text-center">In India, we have a huge population with chronic conditions like diabetes, blood pressure, cancer, heart disease, etc. Hence this facility will help patients to quickly monitor and diagnose their conditions which do not require direct consultation from doctors and can be managed at home.</p>
          </div>
          <div className="bg-EAF2FF w-28 ml-20px p-30px flex items-center flex-col shadow-box">
            <div className="h-50px w-50px bg-00A6A6 rounded-full mb-20px flex justify-center items-center text-white">
              <NoteAddIcon />
            </div>
            <h5 style={{ fontSize: '18px', color: '#F49F0A' }} className="text-center text-18px text-F49F0A">Portal for Exchange of Medical Resources </h5>
            <p className="text-center">This section on the website can be used to fetch or share accurate information about emergency medical needs like oxygen cylinder, blood, bed availability, and medicines.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
