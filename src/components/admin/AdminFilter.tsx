import { Calendar } from "lucide-react";
import React from "react";
import { FaArrowsAltH } from "react-icons/fa";

const AdminFilter = () => {
  return (
    <div className="my-5 flex items-center justify-between gap-4">
      <article className="flex items-center gap-4 w-full">
        <div className="w-full bg-white px-4 rounded-[30px] max-w-[207px] h-11 flex items-center ">
          Highest Price
        </div>
        <div className="w-full bg-white px-4 rounded-[30px] max-w-[207px] h-11 flex items-center ">
          Lowest Price
        </div>
        <p>Registration Date</p>
        <div className="w-full bg-white text-[#2222224D] gap-4 px-4 rounded-[30px] max-w-[290px] h-11 flex items-center ">
          <p>Start Date</p>
          <FaArrowsAltH />
          <p>End Date</p>
          <Calendar />
          <p></p>
        </div>
      </article>
      <div className="w-full bg-[#A69F93] text-white px-4 rounded-[30px] text-sm font-medium max-w-[148px] h-11 flex items-center ">
        Create Product
      </div>
    </div>
  );
};

export default AdminFilter;
