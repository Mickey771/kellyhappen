"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { FaArrowsAltH } from "react-icons/fa";
import CreateProduct from "./components/CreateProduct";
import BottomPagination from "@/components/admin/dashboard/BottomPagination";
const rows = ["User ID", "Product Name", "Price", "Negative"];
interface UserData {
  userId: string;
  productName: string;
  price: string;
  negative: string;
}

const users: UserData[] = [
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$250",
    negative: "-50",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$400",
    negative: "-38",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$250",
    negative: "-50",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$400",
    negative: "-38",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$250",
    negative: "-50",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$400",
    negative: "-38",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$250",
    negative: "-50",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$400",
    negative: "-38",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$250",
    negative: "-50",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$400",
    negative: "-38",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$250",
    negative: "-50",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$400",
    negative: "-38",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$250",
    negative: "-50",
  },
  {
    userId: "#15267",
    productName: "Samuel8767w",
    price: "$400",
    negative: "-38",
  },
];

const page = () => {
  const [createProduct, setCreateProduct] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  return (
    <main className="px-4">
      <h2 className="text-[#202224] mt-7 text-3xl font-bold">Products List</h2>
      <div className="my-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <article className="flex items-center flex-wrap gap-4 w-full">
          <div className="border border-[#413B89] shadow text-[#2222224D] text-sm w-full bg-white px-4 rounded-[30px] max-w-[207px] h-11 flex items-center ">
            Highest Price
          </div>
          <div className="border border-[#EBEBEE] shadow text-[#2222224D] text-sm w-full bg-white px-4 rounded-[30px] max-w-[207px] h-11 flex items-center ">
            Lowest Price
          </div>
          <p>Registration Date</p>
          <div className="w-full bg-white text-[#2222224D] gap-4 px-4 border shadow border-[#EBEBEE]  rounded-[30px] max-w-[290px] h-11 flex items-center ">
            <p>Start Date</p>
            <FaArrowsAltH />
            <p>End Date</p>
            <Calendar />
            <p></p>
          </div>
        </article>
        <button
          className="w-full bg-[#A69F93] text-white cursor-pointer px-4 rounded-[30px] text-sm font-medium max-w-[148px] h-11 flex items-center "
          onClick={() => setCreateProduct(true)}
        >
          Create Product
        </button>
      </div>
      <section>
        <div className=" w-[95vw] mx-auto md:w-[calc(100vw-200px)] overflow-x-auto lg:w-[calc(100vw-260px)] border rounded-xl border-[#EBEBEE]  ">
          <table className="w-full text-sm  text-left  ">
            <thead className="bg-white ">
              <tr className="text-sm text-[#49454FCC]">
                {rows.map((header) => (
                  <th key={header} className="p-4 whitespace-nowrap">
                    {header}
                  </th>
                ))}
                <th className="p-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <ProductTable user={user} key={i} i={i} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <BottomPagination pageNum={pageNum} setPageNum={setPageNum} max={10} />
      {createProduct && <CreateProduct setCreate={setCreateProduct} />}
    </main>
  );
};

export default page;

interface ProductTableProps {
  user: UserData;
  i: number;
}
const ProductTable = ({ user, i }: ProductTableProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        key={i}
        className={`${
          i % 2 === 0 ? "bg-none" : "bg-white"
        } text-sm text-gray-700`}
      >
        <td className="px-4 py-3">{user.userId}</td>
        <td className="px-4 py-3">{user.productName}</td>
        <td className="px-4 py-3">{user.price}</td>
        <td className="px-4 py-3">{user.negative}</td>
        <td className="px-4 py-3 flex justify-end items-center">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 bg-white hover:bg-blue-100 cursor-pointer outline-none border border-[#EBEBEE] rounded-[30px] px-3 py-2 text-sm">
                Action <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-65 p-5 bg-white border border-[#EBEBEE] rounded-[30px]">
              <DropdownMenuLabel
                className="flex items-center justify-center bg-[#F3F4F6] cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Action <ChevronUp />
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="text-sm font-medium flex justify-center cursor-pointer bg-[#F3F4F6] text-[#333333CC] hover:text-white hover:bg-[#A69F93]">
                  Add to Order
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm font-medium flex justify-center cursor-pointer bg-[#F3F4F6] text-[#333333CC] hover:text-white hover:bg-[#A69F93]">
                  Replace Next Order
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>
      {/* {continousSingle && (
          <ContinousSingle setContinousSingle={setContinousSingle} />
        )}
        {showWalletInformation && (
          <WalletInformation setShow={setShowWalletInformation} />
        )}
        {showAddDebit && <AddDebit setShow={setShowAddDebit} />} */}
    </>
  );
};
