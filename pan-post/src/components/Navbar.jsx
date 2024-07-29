import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-20 bg-indigo-500">
      <div className="w-full h-full flex items-center justify-between px-4">
        <h2 className="text-slate-100 text-3xl select-none">
          <Link to="/">PanPost</Link>
        </h2>
        <p className="bg-slate-300 p-3 rounded-3xl hover:bg-slate-200 hover:scale-105 transition-all duration-500">
          <Link to="/List">Verified List</Link>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
