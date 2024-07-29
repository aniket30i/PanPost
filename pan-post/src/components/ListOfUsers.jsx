import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const ListOfUsers = () => {
  const [storedEntries, setStoredEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");

  useEffect(() => {
    const entries = localStorage.getItem("formEntries");
    if (entries) {
      setStoredEntries(JSON.parse(entries));
    }
  }, []);

  const handleEditClick = (index) => {
    setCurrentEditIndex(index);
    setIsEditing(true);
    setNewAddress(storedEntries[index].address);
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

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
      {storedEntries.length > 0 ? (
        <div>
          <h2>List of Users</h2>
          <ul>
            {storedEntries.map((entry, index) => (
              <li key={index} className="border p-2 my-2">
                <p>
                  <strong>PAN:</strong> {entry.pan}
                </p>
                <p>
                  <strong>Full Name:</strong> {entry.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {entry.email}
                </p>
                <p>
                  <strong>Contact:</strong> {entry.contact}
                </p>
                <p>
                  <strong>Addresses:</strong> {entry.address}
                </p>
                <p>
                  <strong>Postcode:</strong> {entry.postcode}
                </p>
                <p>
                  <strong>City:</strong> {entry.city}
                </p>
                <p>
                  <strong>State:</strong> {entry.state}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleEditClick(index)}
                >
                  Edit Address
                </button>
                {isEditing && currentEditIndex === index && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newAddress}
                      onChange={handleAddressChange}
                      className="border p-2 w-full"
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  </div>
                )}
                <div className="mt-2">
                  <input
                    type="text"
                    value={additionalAddress}
                    onChange={handleAdditionalAddressChange}
                    placeholder="Add another address"
                    className="border p-2 w-full"
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => handleAddAddressClick(index)}
                  >
                    Add Address
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Storage is empty</p>
      )}
    </>
  );
};

export default ListOfUsers;
