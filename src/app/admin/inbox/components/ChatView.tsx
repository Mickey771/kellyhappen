import {
  ChevronLeft,
  EllipsisVertical,
  FileSpreadsheet,
  Info,
} from "lucide-react";
import { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoIosInformationCircle } from "react-icons/io";
import { MdDelete, MdPrint } from "react-icons/md";
import { TbBrandTelegram } from "react-icons/tb";
import { TiMicrophone } from "react-icons/ti";

type Message = {
  text: string;
  time: string;
  fromUser: boolean;
};

const messages: Message[] = [
  {
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    time: "6:30 pm",
    fromUser: false,
  },
  {
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    time: "6:34 pm",
    fromUser: true,
  },
  {
    text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
    time: "6:38 pm",
    fromUser: false,
  },
  {
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    time: "6:30 pm",
    fromUser: false,
  },
  {
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    time: "6:34 pm",
    fromUser: true,
  },
  {
    text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
    time: "6:38 pm",
    fromUser: false,
  },
];

const ChatView = () => {
  const [input, setInput] = useState("");

  return (
    <main className="basis-2/3 relative flex-1 border-[0.3px] border-[#B9B9B9] rounded-[14px] scrollbar-hide   bg-white  overflow-y-auto h-[80vh] ">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E0E0E0] p-3">
        <div className="flex items-center gap-4">
          <div className="size-6 flex items-center justify-center rounded-sm bg-[#F5F5F5] cursor-pointer">
            <ChevronLeft />
          </div>
          <h3 className="font-bold text-xl text-[#202224]">Minerva Barnett</h3>
          <span className="rounded bg-pink-200 px-2 py-0.5 text-xs text-pink-800">
            Friends
          </span>
        </div>
        <div className="flex gap-3 rounded-[12px] border border-[#D5D5D5]  text-lg text-black relative">
          {/* Print Button */}
          <div className="group  size-7 justify-center relative flex flex-col items-center">
            <button className="cursor-pointer">
              <MdPrint size={20} />
            </button>
            <span className="absolute top-[120%] hidden rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
              Print
            </span>
          </div>

          <div className="h-7 w-px bg-[#D5D5D5]" />

          {/* Info Button */}
          <div className="group  size-7 justify-center relative flex flex-col items-center">
            <button className="cursor-pointer">
              <IoIosInformationCircle size={20} />
            </button>
            <span className="absolute top-[120%] hidden rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
              Info
            </span>
          </div>
          <div className="h-7 w-px bg-[#D5D5D5]" />

          {/* Delete Button */}
          <div className="group  size-7 justify-center relative flex flex-col items-center">
            <button className="cursor-pointer">
              <MdDelete size={20} />
            </button>
            <span className="absolute top-[120%] hidden rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
              Delete
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 h-[75%] scrollbar-hide overflow-y-auto px-2 py-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 flex gap-4 ${
              msg.fromUser ? "justify-end items-end" : "items-end justify-start"
            }`}
          >
            {!msg.fromUser && (
              <div className="size-8 rounded-full bg-[#D8D8D8]" />
            )}
            <div
              className={`max-w-[60%] rounded-xl px-4 py-3 lg:px-5 lg:py-4 shadow ${
                msg.fromUser
                  ? "bg-[#D2C9BC] text-white"
                  : "bg-[#F5F5F5] text-black"
              }`}
            >
              <p className="text-sm text-[#202224]">{msg.text}</p>
              <div className="flex items-center text-[#757575]  text-xs  justify-end">
                <span className="mt-2 block text-right">{msg.time}</span>
                <EllipsisVertical />
              </div>
            </div>
            {msg.fromUser && (
              <div className="size-8 rounded-full bg-[#D8D8D8]" />
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className=" absolute w-full bottom-0 text-[#9D9D9D] z-[50] px-4 lg:px-6 mt-auto flex items-center gap-4 lg:gap-6 border-t border-[#E0E0E0] py-3">
        <TiMicrophone size={20} className="cursor-pointer" />

        <input
          type="text"
          className="flex-1 rounded-md border-none px-4 py-2 outline-none"
          placeholder="Write message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <GrAttachment size={20} className="cursor-pointer" />
        <FileSpreadsheet size={20} className="cursor-pointer" />
        <button className="cursor-pointer flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 bg-[#A69F93] text-white hover:bg-[#A69F93]/90 transition">
          Send
          <TbBrandTelegram size={20} className="cursor-pointer" />
        </button>
      </div>
    </main>
  );
};

export default ChatView;
