import { useCallback, useEffect, useState } from "react";
import vpf from "../assets/UI/panver-side.svg";
import send from "../assets/icons/sendico.png";
import error from "../assets/icons/error.png";
import success from "../assets/icons/success.png";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { fetchPanVerify, resetStatepan } from "../Store/UserSlice";
import { InfinitySpin } from "react-loader-spinner";
import { fetchPostCode, resetStatepost } from "../Store/PostalSlice";
import SelectComp from "./SelectComp";
import { cityData, stateData } from "./Datalist";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const Panverify = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.pan.status);
  const statuspost = useSelector((state) => state.postal.status);

  const fullName = useSelector((state) => state.pan.fullName);
  const city = useSelector((state) => state.postal.city);
  const state = useSelector((state) => state.postal.state);

  const [formData, setFormData] = useState({
    pan: "",
    fullName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
    postcode: "",
    city: "",
    state: "",
  });

  const handleSlowInput = useCallback(
    debounce((name, value) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, 3000),
    []
  );

  // A 3 second debouncer to reduce re-renders

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleSlowInput(name, value);
  };

  useEffect(() => {
    if (status === "Success") {
      setFormData((prevData) => ({
        ...prevData,
        fullName: fullName,
      }));
    }
  }, [fullName, status]);

  // console.log("this is test purpose", formData);

  const updateField = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (statuspost === "Success") {
      updateField("city", city);
      updateField("state", state);
    }
  }, [status, statuspost, city, state]);

  ///////////// Pan verification dispatch //////////////
  const handlePanverification = (e) => {
    const val = e.target.value.toUpperCase();
    dispatch(resetStatepan("idle"));
    const panPattern = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    if (val.length >= 10 && !panPattern.test(val))
      dispatch(resetStatepan("failed"));
    if (val.length === 10 && panPattern.test(val)) {
      dispatch(fetchPanVerify(val));
      if (status === "Success") setIsPanVerified(true);
      updateField("pan", val);
    }
  };

  ///////////// Postal code dispatch //////////////
  const handlePostfetch = (e) => {
    const val = e.target.value;
    dispatch(resetStatepost("idle"));
    const pinPattern = /^\d{6}$/;
    if (val.length >= 10 && !pinPattern.test(val));
    dispatch(resetStatepost("failed"));
    if (val.length === 6 && pinPattern.test(val)) {
      dispatch(fetchPostCode(val));
      if (statuspost === "Success") setIsPostFetched(true);
      updateField("postcode", val);
    }
  };

  //////// Saving full data to local storage ////////

  const handleSubmit = (e) => {
    e.preventDefault();
    const formEntries = JSON.parse(localStorage.getItem("formEntries")) || [];
    formEntries.push({ ...formData, id: formData.pan });
    localStorage.setItem("formEntries", JSON.stringify(formEntries));

    toast.success("Submitted");

    console.log("this is submission", formData);
    console.log("Submitted");
  };

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
        <div className="w-1/2 h-full bg-slate-100 border-2 rounded-xl border-indigo-500 p-4 overflow-y-auto">
          <form action="" className="">
            <legend className="flex justify-center text-xl">
              Personal Information
            </legend>
            <div className="mt-8 flex flex-col gap-1">
              <div id="pan-box" className="flex justify-between">
                <Input
                  fieldName="PAN Number*"
                  maxLength="10"
                  id="pan"
                  name="pan"
                  type="text"
                  pattern="^[A-Z]{5}\d{4}[A-Z]{1}$"
                  required
                  onChange={handlePanverification}
                  value={formData.pan}
                />
                {status === "loading" && (
                  <div className="self-end">
                    <InfinitySpin
                      visible={true}
                      width="90"
                      color="#333"
                      ariaLabel="infinity-spin-loading"
                    />
                  </div>
                )}

                {status === "failed" && (
                  <img src={error} className="h-8 w-8 self-end" />
                )}

                {status === "Success" && (
                  <img src={success} className="h-8 w-8 self-end" />
                )}
              </div>
              <Input
                fieldName="Full Name*"
                maxLength="10"
                id="fullName"
                name="fullName"
                type="text"
                required
                onChange={handleInputChange}
                value={formData.fullName}
              />
              <Input
                fieldName="Email*"
                maxLength="255"
                id="email"
                name="email"
                type="email"
                required
                onChange={handleInputChange}
                value={formData.email}
              />
              <Input
                fieldName="Mobile*"
                maxLength="14"
                id="contact"
                name="contact"
                type="tel"
                pattern="\+91[0-9]{10}"
                required
                onChange={handleInputChange}
                value={formData.mobile}
                prefix="+91 "
              />
            </div>
            <div className="mt-5">
              <Input
                fieldName="Address 1*"
                maxLength="140"
                id="address1"
                name="address1"
                type="text"
                required
                onChange={handleInputChange}
                value={formData.address}
              />
              <Input
                fieldName="Address 2"
                maxLength="140"
                id="address2"
                name="address2"
                type="text"
                onChange={handleInputChange}
              />
              <div className="flex justify between">
                <Input
                  fieldName="Postal code"
                  maxLength="6"
                  id="postcode"
                  name="postcode"
                  type="text"
                  required
                  onChange={handlePostfetch}
                  value={formData.postcode}
                />
                {statuspost === "loading" && (
                  <div className="self-end">
                    <InfinitySpin
                      visible={true}
                      width="90"
                      color="#333"
                      ariaLabel="infinity-spin-loading"
                    />
                  </div>
                )}

                {statuspost === "failed" && (
                  <img src={error} className="h-8 w-8 self-end" />
                )}

                {statuspost === "Success" && (
                  <img src={success} className="h-8 w-8 self-end" />
                )}
              </div>
              <div className="flex mt-6 px-2 justify-between py-1  w-4/5 rounded-xl drop-shadow-lg">
                <div className="flex flex-col justify-center">
                  <p>City</p>
                  <SelectComp dataset={cityData} value={formData.city} />
                </div>

                <div className="flex flex-col justify-center">
                  <p>State</p>
                  <SelectComp dataset={stateData} value={formData.state} />
                </div>
              </div>
            </div>
          </form>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!(status === "Success" && statuspost === "Success")}
          className={`px-5 py-3 mt-2 bg-indigo-400 hover:scale-105 ${
            status === "Success" && statuspost === "Success"
              ? "bg-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-400"
              : "bg-slate-200"
          } self-center rounded-full`}
        >
          <div className="flex justify-center gap-1">
            <p>Submit</p>
            <img src={send} className="w-6 h-6"></img>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Panverify;
