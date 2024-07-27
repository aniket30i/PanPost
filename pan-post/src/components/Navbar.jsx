import React, { useState } from "react";

const Navbar = () => {
  const [verifyActive, setVerifyActive] = useState(true);
  const [postActive, setPostActive] = useState(false);
  return (
    <nav className="w-full h-20 bg-indigo-500">
      <div className="w-full h-full flex items-center justify-between px-4">
        <h2 className="text-slate-100 text-3xl select-none">PanPost</h2>
        <p className="bg-slate-300 p-3 rounded-3xl hover:bg-slate-200 hover:scale-105 transition-all duration-500">
          Verified List
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
