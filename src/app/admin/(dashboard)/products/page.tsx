// components/admin/ProductsPage.tsx
"use client";
import { useState, useEffect } from "react";
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
import EditProduct from "./components/EditProduct";
import BottomPagination from "@/components/admin/dashboard/BottomPagination";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProducts, clearError } from "@/store/reducers/adminProductSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const rows = [
  "Product ID",
  "Product Name",
  "Price",
  "Negative Amount",
  "Status",
];

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.adminProduct
  );
  const [createProduct, setCreateProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [filters, setFilters] = useState({
    priceFilter: "",
    dateRange: { start: "", end: "" },
    searchTerm: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    // Price filter
    if (filters.priceFilter === "highest") {
      return product.price >= 100; // Adjust threshold as needed
    }
    if (filters.priceFilter === "lowest") {
      return product.price < 100;
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const productDate = new Date(product.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (productDate < startDate || productDate > endDate) {
        return false;
      }
    }

    // Search term filter
    if (filters.searchTerm) {
      return product.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
    }

    return true;
  });

  const clearFilters = () => {
    setFilters({
      priceFilter: "",
      dateRange: { start: "", end: "" },
      searchTerm: "",
    });
  };

  if (isLoading && products.length === 0) {
    return <div className="flex justify-center py-8">Loading products...</div>;
  }

  return (
    <main className="px-4">
      <h2 className="text-[#202224] mt-7 text-3xl font-bold">Products List</h2>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="my-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <article className="flex items-center flex-wrap gap-4 w-full">
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                priceFilter: prev.priceFilter === "highest" ? "" : "highest",
              }))
            }
            className={`border shadow text-sm w-full bg-white px-4 rounded-[30px] max-w-[207px] h-11 flex items-center ${
              filters.priceFilter === "highest"
                ? "border-[#413B89] text-[#413B89]"
                : "border-[#EBEBEE] text-[#2222224D]"
            }`}
          >
            Highest Price
          </button>
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                priceFilter: prev.priceFilter === "lowest" ? "" : "lowest",
              }))
            }
            className={`border shadow text-sm w-full bg-white px-4 rounded-[30px] max-w-[207px] h-11 flex items-center ${
              filters.priceFilter === "lowest"
                ? "border-[#413B89] text-[#413B89]"
                : "border-[#EBEBEE] text-[#2222224D]"
            }`}
          >
            Lowest Price
          </button>

          <input
            type="text"
            placeholder="Search products..."
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
            }
            className="border border-[#EBEBEE] shadow bg-white px-4 rounded-[30px] max-w-[200px] h-11"
          />

          <div className="w-full bg-white text-[#2222224D] gap-4 px-4 border shadow border-[#EBEBEE] rounded-[30px] max-w-[290px] h-11 flex items-center">
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

          {(filters.priceFilter ||
            filters.dateRange.start ||
            filters.searchTerm) && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </article>
        <button
          className="w-full bg-[#A69F93] text-white cursor-pointer px-4 rounded-[30px] text-sm font-medium max-w-[148px] h-11 flex justify-center items-center "
          onClick={() => setCreateProduct(true)}
        >
          Create Product
        </button>
      </div>

      <section>
        <div className="w-[95vw] mx-auto md:w-[calc(100vw-200px)] overflow-x-auto lg:w-[calc(100vw-260px)] border rounded-xl border-[#EBEBEE]">
          <table className="w-full text-sm text-left">
            <thead className="bg-white">
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
              {filteredProducts.map((product, i) => (
                <ProductTable
                  product={product}
                  key={product.id}
                  i={i}
                  onEdit={() => setEditProduct(product)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <BottomPagination
        pageNum={pageNum}
        setPageNum={setPageNum}
        max={Math.ceil(filteredProducts.length / 10)}
      />

      {createProduct && <CreateProduct setCreate={setCreateProduct} />}
      {editProduct && (
        <EditProduct
          setEdit={() => setEditProduct(null)}
          product={editProduct}
        />
      )}
    </main>
  );
};

interface ProductTableProps {
  product: any;
  i: number;
  onEdit: () => void;
}

const ProductTable = ({ product, i, onEdit }: ProductTableProps) => {
  const [open, setOpen] = useState(false);

  const getStatusColor = (isActive: boolean, endDate: string) => {
    if (!isActive) return "text-red-600 bg-red-100";
    if (new Date() > new Date(endDate)) return "text-gray-600 bg-gray-100";
    return "text-green-600 bg-green-100";
  };

  const getStatusText = (isActive: boolean, endDate: string) => {
    if (!isActive) return "Inactive";
    if (new Date() > new Date(endDate)) return "Expired";
    return "Active";
  };

  return (
    <tr
      key={i}
      className={`${
        i % 2 === 0 ? "bg-none" : "bg-white"
      } text-sm text-gray-700`}
    >
      <td className="px-4 py-3">#{product.id}</td>
      <td className="px-4 py-3 flex items-center gap-2">
        {product.image && (
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            className="w-8 h-8 rounded object-cover"
          />
        )}
        {product.name}
      </td>
      <td className="px-4 py-3">${product.price}</td>
      <td className="px-4 py-3">-${product.negativeAmount}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            product.isActive,
            product.endDate
          )}`}
        >
          {getStatusText(product.isActive, product.endDate)}
        </span>
      </td>
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
              <DropdownMenuItem
                onClick={onEdit}
                className="text-sm font-medium flex justify-center cursor-pointer bg-[#F3F4F6] text-[#333333CC] hover:text-white hover:bg-[#A69F93]"
              >
                Edit Product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm font-medium flex justify-center cursor-pointer bg-[#F3F4F6] text-[#333333CC] hover:text-white hover:bg-[#A69F93]">
                Set User Override
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm font-medium flex justify-center cursor-pointer bg-[#F3F4F6] text-[#333333CC] hover:text-white hover:bg-[#A69F93]">
                {product.isActive ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default ProductsPage;
