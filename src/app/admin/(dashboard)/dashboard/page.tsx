"use client";
import ChartsIcon from "@/assets/ChartsIcon";
import CubesIcon from "@/assets/CubesIcon";
import HistoryIcon from "@/assets/HistoryIcon";
import UsersIcon from "@/assets/UsersIcon";
import BottomPagination from "@/components/admin/dashboard/BottomPagination";
import UserTable from "@/components/admin/dashboard/UserTable";

import { Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { FaArrowsAltH } from "react-icons/fa";

const hero = [
  {
    title: "Total Users",
    amount: "40,689",
    icon: <UsersIcon />,
    percentage: "1.3%",
    status: "up",

    downText: " Up from yesterday",
  },
  {
    title: "Total Users",
    amount: "40,689",
    icon: <CubesIcon />,
    status: "up",

    percentage: "1.3%",

    downText: " Up from past week",
  },
  {
    title: "Total Users",
    amount: 40689,
    icon: <ChartsIcon />,
    percentage: "1.3%",
    status: "down",

    downText: "Down from yesterday",
  },
  {
    title: "Total Users",
    amount: 40689,
    icon: <HistoryIcon />,
    percentage: "1.3%",
    status: "up",
    downText: "Up from yesterday",
  },
];
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
  "User ID",
  "Username",
  "Mobile No.",
  "Balance",
  "Daily set Orders",
  "Today’s Orders",
  "Todays Commission",
  "Reputation",
  "Action",
];
const max = 10; // based on imporeted data

const page = () => {
  const [pageNum, setPageNum] = useState(1);
  return (
    <main>
      <h2 className="text-[#202224] mt-4 p-4 text-3xl font-bold">Dashboard</h2>
      <section className="mt-4 px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hero.map(
          ({ title, amount, icon, percentage, status, downText }, i) => {
            return (
              <article
                key={i}
                className="w-full sm:max-w-[280px] rounded-xl shadow-lg bg-white p-4"
              >
                <div className="flex justify-between">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[#202224]/70 font-semibold">{title}</h3>
                    <p className="text-2xl font-bold text-[#202224]">
                      {amount}
                    </p>
                  </div>
                  {icon}
                </div>
                <div className="mt-6 flex text-[#606060] text-sm xl:text-base items-center gap-1 ">
                  {status == "down" ? (
                    <TrendingDown color="#F93C65" size={20} />
                  ) : (
                    <TrendingUp color="#00B69B" size={20} />
                  )}
                  <p
                    className={`font-medium ${
                      status == "down" ? "text-[#F93C65]" : "text-[#00B69B"
                    }`}
                  >
                    {percentage}
                  </p>
                  <p className="text-[#606060] font-semibold">{downText}</p>
                </div>
              </article>
            );
          }
        )}
      </section>
      <h2 className=" text-xl px-4 my-6 font-medium text-[#49454FCC]">
        Members & Orders
      </h2>
      <div className="my-5 p-4 flex flex-col flex-wrap lg:flex-nowrap md:flex-row md:items-center justify-between gap-4">
        <article className="flex flex-col md:flex-row flex-wrap md:items-center gap-4 w-full">
          <div className="w-full border border-[#413B89] bg-white px-4 rounded-[30px] md:max-w-[207px] text-sm text-center  text-[#2222224D] h-11 flex items-center ">
            Enter user’s username
          </div>
          <div className="border border-[#EBEBEE] w-full bg-white px-4 rounded-[30px] text-sm text-[#2222224D] text-center md:max-w-[237px] h-11 flex items-center ">
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
        <article className="p-4 flex items-center  w-full md:w-1/3 md:justify-end">
          <div className="w-full bg-[#A69F93] text-white px-4 rounded-[30px] text-sm font-medium max-w-[109px] h-11 flex items-center justify-center ">
            Inquiry
          </div>
          <div className="w-full border border-[#D0D5DD] px-4 rounded-[30px] max-w-[150px] h-11 flex items-center text-sm font-medium text-[#333333] justify-center">
            <Calendar />
            <span>This Month</span>
          </div>
        </article>
      </div>
      <section className="">
        <div className="scrollbar-hide w-[95vw] mx-auto md:w-[calc(100vw-200px)] overflow-x-auto lg:w-[calc(100vw-260px)] border rounded-xl border-[#EBEBEE]  ">
          <table className="w-full text-sm  text-left  ">
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
                <UserTable user={user} key={i} i={i} />
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
