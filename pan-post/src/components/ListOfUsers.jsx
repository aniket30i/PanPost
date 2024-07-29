import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import nothing from "../assets/UI/postcode-side.svg";
import { toast } from "react-toastify";
import EditableUser from "./EditableUser.jsx";

const ListOfUsers = () => {
  const [storedEntries, setStoredEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");

  ///// Accessing the content from the local ///////////
  const fetchFromLocalStorage = () => {
    const entries = localStorage.getItem("formEntries");
    if (entries) {
      setStoredEntries(JSON.parse(entries));
    }
  };
  useEffect(() => {
    fetchFromLocalStorage();
  }, []);

  //// clean the full storage //////

  const clearStorage = () => {
    localStorage.removeItem("formEntries");
    setStoredEntries([]);
    toast.info("Local storage cleared!");
  };

  ///// Edit address handling

  const handleEditClick = (index) => {
    setCurrentEditIndex(index);
    setIsEditing(true);
    setNewAddress(storedEntries[index].address);
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  ////Addtional address handler////////
  const handleAdditionalAddressChange = (e) => {
    setAdditionalAddress(e.target.value);
  };

  const handleSaveClick = () => {
    const updatedEntries = [...storedEntries];
    updatedEntries[currentEditIndex].address = newAddress
      .split(",")
      .map((addr) => addr.trim());

    setStoredEntries(updatedEntries);
    localStorage.setItem("formEntries", JSON.stringify(updatedEntries));

    setIsEditing(false);
    setCurrentEditIndex(null);
    setNewAddress("");
  };

  const handleAddAddressClick = (index) => {
    if (additionalAddress.trim() === "") return;

    const updatedEntries = [...storedEntries];
    if (updatedEntries[index].address.length < 10) {
      updatedEntries[index].address.push(additionalAddress.trim());
      setStoredEntries(updatedEntries);
      localStorage.setItem("formEntries", JSON.stringify(updatedEntries));
      setAdditionalAddress("");
    } else {
      alert("You can add up to 10 addresses only.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-zinc-200 ">
        <button
          className="bg-red-500 p-4 rounded-lg text-lg text-slate-100"
          onClick={clearStorage}
        >
          Clear List
        </button>
      </div>
      {storedEntries.length > 0 ? (
        <div>
          <h2>List of Users</h2>
          <ul>
            {storedEntries.map((entry, index) => (
              <EditableUser
                entry={entry}
                key={index}
                handleEditClick={handleEditClick}
                handleAddressChange={handleAddressChange}
                handleAdditionalAddressChange={handleAdditionalAddressChange}
                handleSaveClick={handleSaveClick}
                currentEditIndex={currentEditIndex}
                newAddress={newAddress}
                additionalAddress={additionalAddress}
                isEditing={isEditing}
                fetchFromLocalStorage={fetchFromLocalStorage}
                handleAddAddressClick={(index) => handleAddAddressClick(index)}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex w-full flex-col mt-5 mx-auto gap-10">
          <h1 className="text-4xl self-center">Nothing to show.....</h1>
          <img src={nothing} className="h-1/4 w-1/4 self-center" />
        </div>
      )}
    </>
  );
};

export default ListOfUsers;
