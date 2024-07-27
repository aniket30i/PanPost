import { useState } from "react";
import vpf from "../assets/UI/panver-side.svg";
import send from "../assets/icons/sendico.png";
import Input from "./Input";
const Panverify = () => {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     message: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Handle form submission
  //     console.log("Form submitted:", formData);
  //   };

  return (
    <div className="drop-shadow-lg bg-slate-100 w-7/12 h-3/4 mx-auto my-14 p-8 rounded-xl">
      <div className="flex justify-center gap-8 h-full">
        <div className="w-1/2 bg-indigo-500 flex flex-col items-center p-4 gap-24 rounded-xl">
          <h1 className="text-2xl leading-10 font-bold text-slate-100 self-start">
            Verify and manage <br />
            your PAN information at snap.{" "}
          </h1>
          <p className="text-slate-100 text-sm">
            Discover the first app to verify your PAN card and update your
            details hassle free at an instant.{" "}
          </p>
          <img src={vpf} alt="placeholdersvg" className="w-48 h-48" />
        </div>
        <div className="w-1/2 h-full bg-slate-100 border-2 rounded-xl border-indigo-500 p-4">
          <form action="" className="">
            <legend className="flex justify-center text-xl">
              Personal Information
            </legend>
            <div className="mt-8 flex flex-col gap-1">
              <Input
                fieldName="PAN Number*"
                maxLength="10"
                id="pan"
                name="pan"
                type="text"
                pattern="^[A-Z]{5}\d{4}[A-Z]{1}$"
                required
              />
              <Input
                fieldName="Full Name*"
                maxLength="10"
                id="pan"
                name="pan"
                type="text"
                required
              />
              <Input
                fieldName="Email*"
                maxLength="255"
                id="email"
                name="email"
                type="email"
                required
              />
              <Input
                fieldName="Mobile*"
                maxLength="10"
                id="contact"
                name="contact"
                type="tel"
                pattern="\+91[0-9]{10}"
                required
              />
            </div>
            <div className="mt-5">
              <Input
                fieldName="Address 1"
                maxLength="140"
                id="address"
                name="address"
                type="text"
                required
              />
              <Input
                fieldName="Address 2"
                maxLength="140"
                id="address"
                name="address"
                type="text"
              />
              <Input
                fieldName="Postal code"
                maxLength="6"
                id="postcode"
                name="postcode"
                type="number"
                required
              />
              <div className="flex justify-center">
                <p>City:Kolkata</p>
                <p>State:West Bengal</p>
              </div>
            </div>
          </form>
          <button className="px-5 py-3 bg-indigo-400 hover:scale-105 hover:bg-indigo-500 hover:text-white transition-all duration-400 self-center rounded-full">
            <div className="flex justify-center gap-1">
              <p>Submit</p>
              <img src={send} className="w-6 h-6"></img>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panverify;