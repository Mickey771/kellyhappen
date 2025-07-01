import { Calendar, ChevronDown, MoveRight, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface ContinousSingleProps {
  setContinousSingle: Dispatch<SetStateAction<boolean>>;
}

const ContinousSingle = ({ setContinousSingle }: ContinousSingleProps) => {
  const [showProducts, setShowProducts] = useState(false);
  const products = [
    { title: "Sofa Classic Interiors", price: "50.99" },
    { title: "Sofa Classic Interiors", price: "50.99" },
    { title: "Sofa Classic Interiors", price: "50.99" },
  ];
  const handleReset = () => {};
  return (
    <article className="fixed inset-0 bg-black/30 z-9999 flex justify-center items-center">
      <section className="w-full max-w-2xl py-6 h-9/10 scrollbar-hide overflow-y-auto bg-white rounded-lg">
        <div className="px-6 pb-4 border-b border-[#2e5163] flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#191B1C]">
            Set Continuous Single
          </h2>
          <div
            onClick={() => setContinousSingle(false)}
            className="size-10 rounded-full bg-[#F5F6F7] flex justify-center cursor-pointer items-center"
          >
            <X size={20} />
          </div>
        </div>
        <article className="p-6 space-y-4">
          {/* separatro */}
          <div className="flex justify-between gap-6">
            <div className="w-full flex flex-col gap-1">
              <label className="text-[#191B1C] text-sm">
                Current number of orders made
              </label>
              <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
                0
              </p>
            </div>
            {/* Orders received today */}
            <div className="flex w-full  flex-col gap-1">
              <label className="text-[#191B1C] text-sm">
                Orders received today
              </label>
              <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
                15
              </p>
            </div>
          </div>
          {/* Maximum orders received by level */}
          <div className="flex flex-col gap-1">
            <label className="text-[#191B1C] text-sm">
              Maximum orders received by level
            </label>
            <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
              15
            </p>
          </div>
          {/* separatro */}
          <div className="flex justify-between gap-6">
            {/* Set order number */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-[#191B1C] text-sm">Set order number</label>
              <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
                0
              </p>
            </div>
            {/* Set negative number */}
            <div className="flex w-full  flex-col gap-1">
              <label className="text-[#191B1C] text-sm">
                Set negative number
              </label>
              <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
                15
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            {/* Set created date */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-[#191B1C] text-sm">Created Date</label>
              <div className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#4A5154] flex items-center gap-4">
                <Calendar size={18} color="#A69F93" />
                <span>15 Nov, 2021</span>
              </div>
            </div>
            {/* Set end date */}
            <div className="flex w-full  flex-col gap-1">
              <label className="text-[#191B1C] text-sm">End Date</label>
              <div className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#4A5154] flex items-center gap-4">
                <Calendar size={18} color="#A69F93" />
                <span>15 Nov, 2021</span>
              </div>
            </div>
          </div>
        </article>
        <article className="my-6 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setContinousSingle(false)}
              className=" cursor-pointer rounded-[160px] px-6 py-4 bg-[#F5F6F7] text-[#191B1C] text-sm font-semibold"
            >
              OK
            </button>
            <button
              onClick={handleReset}
              className="rounded-[160px] px-6 py-4 bg-[#F5F6F7] text-[#191B1C] text-sm font-semibold"
            >
              Reset Continuous Orders
            </button>
          </div>
          <div
            onClick={() => setShowProducts(!showProducts)}
            className="cursor-pointer rounded-[160px] px-6 py-4 bg-[#A69F93] text-white gap-4 text-sm font-semibold flex items-center"
          >
            <span>Set in Product list</span>
            <MoveRight />
          </div>
        </article>

        {showProducts && (
          <section className="mt-6">
            {/* Product list  */}
            <div className="px-5 py-4 border-b border-[#F5F6F7] flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#191B1C]">
                Product List
              </h2>
              <div
                onClick={() => setShowProducts(false)}
                className="size-10 rounded-full bg-[#F5F6F7] flex justify-center cursor-pointer items-center"
              >
                <X size={20} />
              </div>
            </div>
            <article className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2 w-full">
                <div className="flex items-center rounded-sm w-full max-w-[188px] px-4 p-3 border border-[#E5E7E8] text-[#959FA3] text-sm">
                  <p>Lowest Price</p>
                </div>
                <div className="flex items-center rounded-sm w-full max-w-[188px] px-4 p-3 border border-[#E5E7E8] text-[#959FA3] text-sm">
                  <p>Highest Price</p>
                </div>
              </div>
              <div className="rounded-[160px] px-6 py-4 bg-[#A69F93] text-white gap-4 text-sm font-semibold flex items-center">
                <span>Screening</span>
                <MoveRight />
              </div>
            </article>
            <article className="space-y-2 px-6">
              {products.map((prod, i) => {
                return (
                  <div
                    className={`${
                      i % 2 === 1 ? "bg-none" : "bg-[#F3F4F6]"
                    } text-sm  p-2 flex items-center justify-between gap-4`}
                    key={i}
                  >
                    <p className="text-[#191B1C] text-sm">{prod.title}</p>
                    <p className="text-[#191B1C]">{prod.price}</p>
                    <div className=" flex items-center gap-4">
                      <button className="bg-[#A69F93] text-white px-4 rounded-[160px] text-sm leading-10">
                        Add to order
                      </button>
                      <button className="bg-[#A69F93] text-white px-4 rounded-[160px] text-sm leading-10">
                        Replace next order
                      </button>
                    </div>
                  </div>
                );
              })}
            </article>
          </section>
        )}
      </section>
    </article>
  );
};

export default ContinousSingle;

// import { Calendar, ChevronDown, MoveRight, X } from "lucide-react";
// import { Dispatch, SetStateAction, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// interface ContinousSingleProps {
//   setContinousSingle: Dispatch<SetStateAction<boolean>>;
// }

// const products = [
//   { title: "Sofa Classic Interiors", price: "50.99" },
//   { title: "Sofa Classic Interiors", price: "50.99" },
//   { title: "Sofa Classic Interiors", price: "50.99" },
// ];

// const schema = yup.object().shape({
//   orderNumber: yup.number().required(),
//   negativeNumber: yup.number().required(),
//   createdDate: yup.string().required(),
//   endDate: yup.string().required(),
// });

// type FormValues = yup.InferType<typeof schema>;

// const ContinousSingle = ({ setContinousSingle }: ContinousSingleProps) => {
//   const [showProducts, setShowProducts] = useState(false);
//   const { register, handleSubmit, reset } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log("Form Data:", data);
//     setContinousSingle(false); // Close modal on success
//   };

//   const handleReset = () => reset();

//   return (
//     <article className="fixed inset-0 bg-black/30 z-9999 flex justify-center items-center">
//       <section className="w-full max-w-2xl py-6 h-9/10 scrollbar-hide overflow-y-auto bg-white rounded-lg">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-6 pb-4 border-b border-[#2e5163] flex items-center justify-between">
//             <h2 className="text-lg font-medium text-[#191B1C]">
//               Set Continuous Single
//             </h2>
//             <div
//               onClick={() => setContinousSingle(false)}
//               className="size-10 rounded-full bg-[#F5F6F7] flex justify-center cursor-pointer items-center"
//             >
//               <X size={20} />
//             </div>
//           </div>

//           <article className="p-6 space-y-4">
//             <div className="flex justify-between gap-6">
//               <div className="w-full flex flex-col gap-1">
//                 <label className="text-[#191B1C] text-sm">
//                   Current number of orders made
//                 </label>
//                 <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
//                   0
//                 </p>
//               </div>
//               <div className="flex w-full flex-col gap-1">
//                 <label className="text-[#191B1C] text-sm">
//                   Orders received today
//                 </label>
//                 <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
//                   15
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-[#191B1C] text-sm">
//                 Maximum orders received by level
//               </label>
//               <p className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]">
//                 15
//               </p>
//             </div>

//             <div className="flex justify-between gap-6">
//               <div className="w-full flex flex-col gap-1">
//                 <label className="text-[#191B1C] text-sm">
//                   Set order number
//                 </label>
//                 <input
//                   type="number"
//                   {...register("orderNumber")}
//                   className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]"
//                 />
//               </div>
//               <div className="flex w-full flex-col gap-1">
//                 <label className="text-[#191B1C] text-sm">
//                   Set negative number
//                 </label>
//                 <input
//                   type="number"
//                   {...register("negativeNumber")}
//                   className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#959FA3]"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between gap-6">
//               <div className="w-full flex flex-col gap-1">
//                 <label className="text-[#191B1C] text-sm">Created Date</label>
//                 <input
//                   type="text"
//                   {...register("createdDate")}
//                   placeholder="15 Nov, 2021"
//                   className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#4A5154]"
//                 />
//               </div>
//               <div className="flex w-full flex-col gap-1">
//                 <label className="text-[#191B1C] text-sm">End Date</label>
//                 <input
//                   type="text"
//                   {...register("endDate")}
//                   placeholder="15 Nov, 2021"
//                   className="w-full border rounded-sm border-[#E5E7E8] p-[10px] text-[#4A5154]"
//                 />
//               </div>
//             </div>
//           </article>

//           <article className="my-6 flex items-center justify-between px-6">
//             <div className="flex items-center gap-4">
//               <button
//                 type="submit"
//                 className="cursor-pointer rounded-[160px] px-6 py-4 bg-[#F5F6F7] text-[#191B1C] text-sm font-semibold"
//               >
//                 OK
//               </button>
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="rounded-[160px] px-6 py-4 bg-[#F5F6F7] text-[#191B1C] text-sm font-semibold"
//               >
//                 Reset Continuous Orders
//               </button>
//             </div>
//             <div
//               onClick={() => setShowProducts(!showProducts)}
//               className="cursor-pointer rounded-[160px] px-6 py-4 bg-[#A69F93] text-white gap-4 text-sm font-semibold flex items-center"
//             >
//               <span>Set in Product list</span>
//               <MoveRight />
//             </div>
//           </article>
//         </form>

//         {showProducts && (
//           <section className="mt-6">
//             <div className="px-5 py-4 border-b border-[#F5F6F7] flex items-center justify-between">
//               <h2 className="text-lg font-medium text-[#191B1C]">
//                 Product List
//               </h2>
//               <div
//                 onClick={() => setShowProducts(false)}
//                 className="size-10 rounded-full bg-[#F5F6F7] flex justify-center cursor-pointer items-center"
//               >
//                 <X size={20} />
//               </div>
//             </div>
//             <article className="p-6 flex items-center justify-between">
//               <div className="flex items-center gap-2 w-full">
//                 <div className="flex items-center rounded-sm w-full max-w-[188px] px-4 p-3 border border-[#E5E7E8] text-[#959FA3] text-sm">
//                   <p>Lowest Price</p>
//                 </div>
//                 <div className="flex items-center rounded-sm w-full max-w-[188px] px-4 p-3 border border-[#E5E7E8] text-[#959FA3] text-sm">
//                   <p>Highest Price</p>
//                 </div>
//               </div>
//               <div className="rounded-[160px] px-6 py-4 bg-[#A69F93] text-white gap-4 text-sm font-semibold flex items-center">
//                 <span>Screening</span>
//                 <MoveRight />
//               </div>
//             </article>
//             <article className="space-y-2 px-6">
//               {products.map((prod, i) => (
//                 <div
//                   className={`${
//                     i % 2 === 1 ? "bg-none" : "bg-[#F3F4F6]"
//                   } text-sm p-2 flex items-center justify-between gap-4`}
//                   key={i}
//                 >
//                   <p className="text-[#191B1C] text-sm">{prod.title}</p>
//                   <p className="text-[#191B1C]">{prod.price}</p>
//                   <div className="flex items-center gap-4">
//                     <button className="bg-[#A69F93] text-white px-4 rounded-[160px] text-sm leading-10">
//                       Add to order
//                     </button>
//                     <button className="bg-[#A69F93] text-white px-4 rounded-[160px] text-sm leading-10">
//                       Replace next order
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </article>
//           </section>
//         )}
//       </section>
//     </article>
//   );
// };

// export default ContinousSingle;
