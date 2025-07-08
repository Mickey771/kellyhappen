// components/admin/DashboardPage.tsx
"use client";
import ChartsIcon from "@/assets/ChartsIcon";
import CubesIcon from "@/assets/CubesIcon";
import HistoryIcon from "@/assets/HistoryIcon";
import UsersIcon from "@/assets/UsersIcon";
import BottomPagination from "@/components/admin/dashboard/BottomPagination";
import UserTable from "@/components/admin/dashboard/UserTable";
import { Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { FaArrowsAltH } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchDashboardStats,
  fetchUsers,
  clearError,
} from "@/store/reducers/adminSlice";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { stats, users, isLoading, error } = useAppSelector(
    (state) => state.admin
  );
  const [pageNum, setPageNum] = useState(1);
  const [filters, setFilters] = useState({
    username: "",
    phone: "",
    dateRange: { start: "", end: "" },
  });

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchUsers());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    if (
      filters.username &&
      !user.username.toLowerCase().includes(filters.username.toLowerCase())
    ) {
      return false;
    }
    if (filters.phone && !user.phone.includes(filters.phone)) {
      return false;
    }
    if (filters.dateRange.start && filters.dateRange.end) {
      const userDate = new Date(user.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (userDate < startDate || userDate > endDate) {
        return false;
      }
    }
    return true;
  });

  const hero = [
    {
      title: "Total Users",
      amount: stats?.totalUsers || 0,
      icon: <UsersIcon />,
      percentage: "8.5%",
      status: "up",
      downText: "Up from yesterday",
    },
    {
      title: "Total Orders",
      amount: stats?.totalOrders || 0,
      icon: <CubesIcon />,
      status: "up",
      percentage: "1.3%",
      downText: "Up from past week",
    },
    {
      title: "Today's Transactions",
      amount: stats?.todaysTransactions || 0,
      icon: <ChartsIcon />,
      percentage: "2.5%",
      status: "down",
      downText: "Down from yesterday",
    },
    {
      title: "Pending Payout",
      amount: `$${stats?.pendingPayout || 0}`,
      icon: <HistoryIcon />,
      percentage: "5.1%",
      status: "up",
      downText: "Up from yesterday",
    },
  ];

  const rows = [
    "User ID",
    "Username",
    "Mobile No.",
    "Balance",
    "Level",
    "Completed Tasks",
    "Actions",
  ];

  return (
    <main>
      <h2 className="text-[#202224] mt-4 p-4 text-3xl font-bold">Dashboard</h2>

      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <section className="mt-4 px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hero.map(
          ({ title, amount, icon, percentage, status, downText }, i) => (
            <article
              key={i}
              className="w-full sm:max-w-[280px] rounded-xl shadow-lg bg-white p-4"
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#202224]/70 font-semibold">{title}</h3>
                  <p className="text-2xl font-bold text-[#202224]">{amount}</p>
                </div>
                {icon}
              </div>
              {/* <div className="mt-6 flex text-[#606060] text-sm xl:text-base items-center gap-1">
                {status === "down" ? (
                  <TrendingDown color="#F93C65" size={20} />
                ) : (
                  <TrendingUp color="#00B69B" size={20} />
                )}
                <p
                  className={`font-medium ${
                    status === "down" ? "text-[#F93C65]" : "text-[#00B69B]"
                  }`}
                >
                  {percentage}
                </p>
                <p className="text-[#606060] font-semibold">{downText}</p>
              </div> */}
            </article>
          )
        )}
      </section>

      <h2 className="text-xl px-4 my-6 font-medium text-[#49454FCC]">
        Members
      </h2>

      <div className="my-5 p-4 flex flex-col flex-wrap lg:flex-nowrap md:flex-row md:items-center justify-between gap-4">
        <article className="flex flex-col md:flex-row flex-wrap md:items-center gap-4 w-full">
          <input
            type="text"
            placeholder="Enter user's username"
            value={filters.username}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, username: e.target.value }))
            }
            className="w-full border border-[#EBEBEE] bg-white px-4 rounded-[30px] md:max-w-[207px] text-sm h-11"
          />
          <input
            type="text"
            placeholder="Enter User's Phone number"
            value={filters.phone}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full border border-[#EBEBEE] bg-white px-4 rounded-[30px] md:max-w-[237px] text-sm h-11"
          />
          <p className="text-sm text-[#22222299]">Registration Date</p>
          <div className="w-full border border-[#EBEBEE] bg-white text-[#2222224D] gap-2 px-4 rounded-[30px] max-w-[290px] h-11 flex items-center">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value },
                }))
              }
              className="text-xs border-none outline-none"
            />
            <FaArrowsAltH />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value },
                }))
              }
              className="text-xs border-none outline-none"
            />
            <Calendar />
          </div>
        </article>
      </div>

      <section>
        <div className="scrollbar-hide w-[95vw] mx-auto md:w-[calc(100vw-200px)] overflow-x-auto lg:w-[calc(100vw-260px)] border rounded-xl border-[#EBEBEE]">
          <table className="w-full text-sm text-left">
            <thead className="bg-white">
              <tr className="text-sm text-[#49454FCC]">
                {rows.map((header) => (
                  <th key={header} className="p-4 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={rows.length} className="text-center py-8">
                    Loading users...
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => (
                  <UserTable user={user} key={user.id} i={i} />
                ))
              )}
            </tbody>
          </table>
        </div>

        <BottomPagination
          max={Math.ceil(filteredUsers.length / 10)}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      </section>
    </main>
  );
};

export default DashboardPage;
