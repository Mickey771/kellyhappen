"use client";
import {
  Mail,
  MessageCircle,
  PanelBottomClose,
  Pencil,
  Send,
  Star,
  StarOff,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import ChatView from "./components/ChatView";
interface Email {
  id: number;
  sender: string;
  category: string;
  labelColor: string;
  subject: string;
  time: string;
  checked: boolean;
  starred: boolean;
}

const initialEmails: Email[] = [
  {
    id: 1,
    sender: "Jullu Jalal",
    category: "Primary",
    labelColor: "bg-teal-200",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    checked: true,
    starred: false,
  },
  {
    id: 2,
    sender: "Minerva Barnett",
    category: "Work",
    labelColor: "bg-orange-200",
    subject: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    checked: true,
    starred: false,
  },
  {
    id: 3,
    sender: "Peter Lewis",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Vacation Home Rental Success",
    time: "7:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 4,
    sender: "Anthony Briggs",
    category: "",
    labelColor: "",
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    checked: true,
    starred: true,
  },
  {
    id: 5,
    sender: "Clifford Morgan",
    category: "Social",
    labelColor: "bg-blue-200",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    checked: false,
    starred: false,
  },
  {
    id: 6,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 7,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 8,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 9,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 10,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 11,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 12,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 13,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
  {
    id: 14,
    sender: "Cecilia Webster",
    category: "Friends",
    labelColor: "bg-pink-300",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    checked: false,
    starred: false,
  },
];

const emailNav = [
  {
    title: "Inbox",
    amount: 1212,
    icon: <Mail />,
  },
  {
    title: "Stared",
    amount: 12,
    icon: <Star />,
  },
  {
    title: "Sent",
    amount: 4,
    icon: <Send />,
  },
  {
    title: "Draft",
    amount: 1,
    icon: <Pencil />,
  },
  {
    title: "Spam",
    amount: 6,
    icon: <TriangleAlert />,
  },
  {
    title: "Important",
    amount: 1212,
    icon: <MessageCircle />,
  },
  {
    title: "Bin",
    amount: 1212,
    icon: <Trash2 />,
  },
];
const labels = [
  { title: "Primary", color: "#00B69B" },
  { title: "Social", color: "#5A8CFF" },
  { title: "Work", color: "#FD9A56" },
  { title: "Friends", color: "#D456FD" },
];
const page = () => {
  const [activeNav, setActiveNav] = useState(emailNav[0]);

  return (
    <main className="p-4">
      <h2 className="text-[#202224] text-3xl font-bold">Inbox</h2>
      <section className="mt-6 flex gap-4">
        {/* aside sidebar  */}
        <aside className="basis-1/3 max-w-[290px]  bg-white border-[0.3px] border-[#B9B9B9] shadow  scrollbar-hide rounded-[14px] overflow-y-auto h-[80vh] p-5">
          {/* compose button  */}
          <button className="cursor-pointer bg-[#A69F93] rounded-lg text-sm font-bold text-white w-full h-11 flex items-center justify-center">
            <span>+ Compose</span>
          </button>
          {/* my email  */}
          <article>
            <h2 className="my-5 font-bold text-[#202224]">My Email</h2>
            <div className="">
              {emailNav.map((nav, i) => {
                const { title, amount, icon } = nav;
                return (
                  <div
                    onClick={() => setActiveNav(nav)}
                    key={i}
                    className={`
                        ${
                          activeNav == nav
                            ? "bg-[#A69F9340] text-[#A69F93]"
                            : "bg-none text-[#202224]"
                        } flex items-center justify-between h-11 px-4 rounded`}
                  >
                    <div className="flex items-center gap-2">
                      {icon}
                      <p>{title}</p>
                    </div>
                    <p>{amount}</p>
                  </div>
                );
              })}
            </div>
          </article>
          <article className="mt-11">
            <h2>Label</h2>
            <div>
              {labels.map((label, i) => {
                return (
                  <div key={i} className="flex items-center gap-6 px-4 h-11">
                    <div
                      className={`size-4 border border-[${label.color}] rounded-sm`}
                    />
                    <span>{label.title}</span>
                  </div>
                );
              })}
            </div>
            <div>+ Create New Label</div>
          </article>
        </aside>

        {/* //main content  */}
        <ChatView />
        {/* <EmailList /> */}
      </section>
    </main>
  );
};

export default page;
const EmailList = () => {
  const [emails, setEmails] = useState(initialEmails);

  const toggleCheck = (id: number) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, checked: !email.checked } : email
      )
    );
  };

  const toggleStar = (id: number) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };
  return (
    <main className="basis-2/3 flex-1 border-[0.3px] border-[#B9B9B9] rounded-[14px]   bg-white  overflow-y-auto h-[80vh]">
      <div className="flex p-6  items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-2xl p-2 px-4 border-[#D5D5D5] bg-[#F5F6FA] text-sm text-[#202224] border-[0.5px] w-full max-w-sm">
          <label htmlFor="search">
            <GoSearch size={16} />
          </label>
          <input
            type="text"
            placeholder="Search mail"
            className="bg-none outline-none w-full"
          />
        </div>
        <div className="flex items-center">
          <div className="border p-2 hover:bg-[#D5D5D5] rounded-[2px] border-[#D5D5D5] cursor-pointer">
            <PanelBottomClose size={16} />
          </div>
          <div className="border p-2 rounded-[2px] border-[#D5D5D5] cursor-pointer">
            <Star size={16} />
          </div>
          <div className="border p-2 rounded-[2px] border-[#D5D5D5] cursor-pointer">
            <Trash2 size={16} />
          </div>
        </div>
      </div>
      <section className=" border-t border-[#B9B9B9] ">
        {emails.map((email: Email) => (
          <div
            key={email.id}
            className={`flex items-center justify-between px-4 py-5 border-b border-[#B9B9B9] ${
              email.checked ? "bg-[#F3F4F6]" : "bg-white"
            }`}
          >
            <div className="w-full basis-1/4 flex items-center gap-3 ">
              <input
                type="checkbox"
                checked={email.checked}
                onChange={() => toggleCheck(email.id)}
              />
              <div
                onClick={() => toggleStar(email.id)}
                className="cursor-pointer"
              >
                {email.starred ? (
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                ) : (
                  <StarOff className="text-gray-400" size={18} />
                )}
              </div>
              <div className="font-bold text-sm text-[#202224]">
                {email.sender}
              </div>
            </div>
            <article className="flex items-center justify-between basis-3/4 ">
              <div className="flex items-center gap-2 w-full">
                {email.category && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${email.labelColor}`}
                  >
                    {email.category}
                  </span>
                )}
                <div className="text-[#202224] text-sm font-semibold truncate flex-1">
                  {email.subject}
                </div>
              </div>
              <div className="text-sm text-[#202224] font-semibold w-[64px]">
                {email.time}
              </div>
            </article>
          </div>
        ))}
      </section>
    </main>
  );
};
