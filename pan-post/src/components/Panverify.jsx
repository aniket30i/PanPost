import { useState } from "react";
import vpf from "../assets/UI/panver-side.svg";
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
    <div className="drop-shadow-lg bg-slate-100 w-1/2 h-3/4 mx-auto my-14 p-8 rounded-xl">
      <div className="flex justify-center gap-8 h-full">
        <div className="w-1/2 bg-indigo-500 flex flex-col items-center p-4 gap-24 rounded-xl">
          <h1 className="text-2xl leading-10 font-bold text-slate-100 self-start">
            Verify and manage <br />
            your PAN information at snap.{" "}
          </h1>
          <p className="text-slate-100 text-xs">
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
            <div className="mt-10">
              <Input
                fieldName="PAN Number"
                maxLength="10"
                id="pan"
                name="pan"
                type="text"
                required
              />
              <Input
                fieldName="Full Name"
                maxLength="10"
                id="pan"
                name="pan"
                type="text"
                required
              />
              <Input
                fieldName="Email"
                maxLength="255"
                id="email"
                name="email"
                type="email"
                required
              />
              <Input
                fieldName="Mobile"
                maxLength="10"
                id="contact"
                name="contact"
                type=""
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Panverify;
