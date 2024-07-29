import React from "react";
import Select from "react-select";

const SelectComp = ({ dataset, value = "" }) => {
  return <Select id="city-select" options={dataset} placeholder={value} />;
};

export default SelectComp;
