import Link from "next/link";
import { FaCaretRight } from "react-icons/fa";

interface PlanProps {
  title: string;
  subtitle: string;
  price: string;
  priceLabel: string;
  buttonText: string;
  features: string[];
  bgColor: string;
  textColor: string;
  buttonBg: string;
  buttonTextColor: string;
  checkColor: string;
  footerBg: string;
  footerTextColor: string;
}

const page: React.FC = () => {
  return (
    <section className="p-6">
      <article className="my-4">
        <h2 className="text-3xl font-semibold text-[#333333]">Profile</h2>
        <div className="flex text-sm items-center text-[#888888] gap-4">
          <span>Dashboard</span>
          <FaCaretRight />
          <span>Membership</span>
        </div>
      </article>
      <article className="mt-11 flex flex-row overflow-x-auto scrollbar-hide gap-6">
        <PlanCard
          title="Expert DESIGNER"
          subtitle="Earn more with this plan"
          price="$1000"
          priceLabel="To open"
          buttonText="Subscribe for plan"
          features={[
            "38 Tasks",
            "Can use repeatedly",
            "1% profit in rebates",
            "Chat Support",
            "Higher Benefits",
            "Template Library",
          ]}
          bgColor="#A69F93"
          textColor="white"
          buttonBg="white"
          buttonTextColor="#A69F93"
          checkColor="white"
          footerBg="#111111"
          footerTextColor="white"
        />
        <PlanCard
          title="Beginner Designer"
          subtitle="Earn with this plan"
          price="$50"
          priceLabel="To open"
          buttonText="Subscribe for Plan"
          features={[
            "33 Tasks",
            "Can only use Once",
            "No Chat Support",
            "0.75% profit in Rebate",
            "Less Benefits",
            "Template Library",
          ]}
          bgColor="white"
          textColor="black"
          buttonBg="#a6988f"
          buttonTextColor="white"
          checkColor="#00c1ff"
          footerBg="#a6988f"
          footerTextColor="white"
        />
      </article>
    </section>
  );
};

export default page;

const PlanCard: React.FC<PlanProps> = ({
  title,
  subtitle,
  price,
  priceLabel,
  buttonText,
  features,
  bgColor,
  textColor,
  buttonBg,
  buttonTextColor,
  checkColor,
  footerBg,
  footerTextColor,
}) => {
  return (
    <div
      className="flex flex-col justify-between rounded-lg shadow-md p-8 min-w-xs"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm mb-6">{subtitle}</p>
        <div className="text-4xl font-bold mb-1 flex items-center">
          <span>{price}</span>
          <span className="ml-2 text-xs font-semibold">{priceLabel}</span>
        </div>
        <Link href={"/user/wallet"}>
          <button
            className="w-full outline-none hover:opacity-80 py-3 rounded-md mb-8 mt-4 text-xs cursor-pointer font-semibold"
            style={{ backgroundColor: buttonBg, color: buttonTextColor }}
          >
            {buttonText}
          </button>
        </Link>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke={checkColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {/* <div
        className="text-center font-semibold py-4 rounded-lg mt-12 cursor-pointer hover:opacity-80 select-none"
        style={{ backgroundColor: footerBg, color: footerTextColor }}
      >
        See all features
      </div> */}
    </div>
  );
};
