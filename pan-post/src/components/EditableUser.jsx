import { useState } from "react";

const EditableUser = ({
  entry,
  index,
  handleEditClick,
  handleSaveClick,
  isEditing,
  currentEditIndex,
  fetchFromLocalStorage,
}) => {
  const [addNewAddress, setNewAddress] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const data = localStorage.getItem("formEntries");

  const addAddressHandler = (e) => {
    setNewAddress(e.target.value);
  };

  const submitAddAddressHandler = () => {
    const addressData = JSON.parse(data);
    const filterAddress = addressData.filter((data) => data.id !== entry.id);
    const addAddressFiltered = addressData.filter(
      (data) => data.id === entry.id
    );
    if (addAddressFiltered[0]["newAddress"]) {
      addAddressFiltered[0]["newAddress"] = [
        ...addAddressFiltered[0]["newAddress"],
        addNewAddress,
      ];
    } else {
      addAddressFiltered[0]["newAddress"] = [addNewAddress];
    }
    localStorage.setItem(
      "formEntries",
      JSON.stringify([...filterAddress, ...addAddressFiltered])
    );
    fetchFromLocalStorage();
  };

  return (
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
        <strong>Address 1:</strong> {entry.address1}
      </p>
      {entry.address2 && (
        <p>
          <strong>Address 2:</strong> {entry.address2}
        </p>
      )}
      {entry?.newAddress?.length > 0 &&
        entry.newAddress?.map((data, index) => (
          <p key={index}>
            <strong>Address {index + 3}:</strong> {data}
          </p>
        ))}
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
        className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded"
        onClick={() => handleEditClick(index)}
      >
        Edit Address
      </button>
      {isEditing && currentEditIndex === index && (
        <div className="mt-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder={"Edit Address"}
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
          value={addNewAddress}
          onChange={addAddressHandler}
          placeholder="Add another address"
          className="border p-2 w-full"
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={submitAddAddressHandler}
        >
          Add Address
        </button>
      </div>
    </li>
  );
};

export default EditableUser;
