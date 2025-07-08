"use client";
import BottomPagination from "@/components/admin/dashboard/BottomPagination";
import MembersTable from "@/components/admin/members/MembersTable";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { FaArrowsAltH } from "react-icons/fa";

const users = [
  {
    id: "#15267",
    username: "Kevinsamsons",
    phone: "08123456789",
    balance: "$40",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 33,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15267",
    username: "Kevinsamsons",
    phone: "08123456789",
    balance: "$40",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 33,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15267",
    username: "Kevinsamsons",
    phone: "08123456789",
    balance: "$40",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 33,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  {
    id: "#15387",
    username: "Kevinsamuels",
    phone: "08123456789",
    balance: "$500",
    dailyOrders: 33,
    todayOrders: 33,
    commission: "$150",
    reputation: 38,
  },
  // ...add more dummy rows as needed
];
const rows = [
  "Product ID",
  "Username",
  "Mobile No.",
  "Balance",
  "Daily set Orders",
  "Today’s Orders",
  "Todays Commission",
  "Reputation",
  "Action",
];
const page = () => {
  const max = 10; // based on imporeted data
  const [pageNum, setPageNum] = useState(1);

  return (
    <main className="px-4">
      <h2 className="text-[#202224] text-3xl my-6 font-bold">Members List</h2>

      <div className="my-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <article className="flex items-center flex-wrap gap-4 w-full">
          <div className="w-full border border-[#413B89] bg-white px-4 rounded-[30px] max-w-[207px] text-sm text-center  text-[#2222224D] h-11 flex items-center ">
            Enter user’s username
          </div>
          <div className="border border-[#EBEBEE] w-full bg-white px-4 rounded-[30px] text-sm text-[#2222224D] text-center max-w-[237px] h-11 flex items-center ">
            Enter User’s Phone number
          </div>
          <p className="text-sm text-[#22222299]">Registration Date</p>
          <div className="w-full border border-[#EBEBEE] bg-white text-[#2222224D] gap-4 px-4 rounded-[30px] max-w-[290px] h-11 flex items-center ">
            <p>Start Date</p>
            <FaArrowsAltH />
            <p>End Date</p>
            <Calendar />
          </div>
        </article>
        <article className="flex items-center w-1/3 justify-end">
          <div className="w-full bg-[#A69F93] text-white px-4 rounded-[30px] text-sm font-medium max-w-[109px] h-11 flex items-center justify-center ">
            Inquiry
          </div>
          <div className="w-full border border-[#D0D5DD] px-4 rounded-[30px] max-w-[150px] h-11 flex items-center text-sm font-medium text-[#333333] justify-center">
            <Calendar />
            <span>This Month</span>
          </div>
        </article>
      </div>
      <section>
        <div className="scrollbar-hide w-[95vw] mx-auto md:w-[calc(100vw-200px)] overflow-x-auto lg:w-[calc(100vw-260px)] border rounded-xl border-[#EBEBEE]  ">
          <table className="min-w-full text-sm  text-left  ">
            <thead className="bg-white ">
              <tr className="text-sm text-[#49454FCC]">
                {rows.map((header) => (
                  <th key={header} className="p-4 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <MembersTable user={user} key={i} i={i} />
              ))}
            </tbody>
          </table>
        </div>

        <BottomPagination max={max} pageNum={pageNum} setPageNum={setPageNum} />
      </section>
    </main>
  );
};

export default page;
