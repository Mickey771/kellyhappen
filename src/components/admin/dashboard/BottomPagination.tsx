import CsvIcon from "@/assets/CsvIcon";
import { FileX, ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const options = [5, 10, 15, 20, 25];

interface Props {
  max: number;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}

const BottomPagination = ({ max, pageNum, setPageNum }: Props) => {
  const numbers = Array.from({ length: max }, (_, i) => i + 1);

  const handlePrev = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleNext = () => {
    if (pageNum < max) setPageNum(pageNum + 1);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between p-4 text-sm bg-white">
      <div className="flex items-center gap-2">
        <select className=" rounded p-1 bg-[#DEDEDE] text-[#333333CC] font-medium">
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="text-[#333333CC] font-medium">per page</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-lg font-medium text-[#222222E5] rounded-[30px] border-[#EBEBEE] flex items-center gap-2 px-7 border   py-3">
          Export
          <CsvIcon />
          <FileX className="ml-2" size={16} color="#222222E5" />
        </button>

        {/* Page Selector */}
        <select
          value={pageNum}
          onChange={(e) => setPageNum(Number(e.target.value))}
          className="border-none bg-[#DEDEDE] rounded px-1 py-1 outline-none text-[#333333CC]"
        >
          {numbers.map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <span className="text-[#333333CC] font-medium">of {max} pages</span>

        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          disabled={pageNum === 1}
          className="disabled:opacity-50"
        >
          <ChevronLeft />
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={pageNum === max}
          className="disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BottomPagination;
