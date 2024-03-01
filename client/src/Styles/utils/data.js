import React from "react";
import { FaHome } from "react-icons/fa";
import { GiNetworkBars } from "react-icons/gi";
import { BiCreditCard, BiReceipt } from "react-icons/bi";
import { RiSettings5Fill, RiRefund2Fill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";

export const sideBarButton = [
  {
    name: "Dashboard",
    url: "/profile",
    icon: <FaHome />,
  },
  {
    name: "Buy Data",
    url: "/profile/buydata",
    icon: <GiNetworkBars />,
  },
  {
    name: "Buy Airtime",
    url: "/profile/buyairtime",
    icon: <FiPhoneCall />,
  },
  {
    name: "Fund wallet(COUPON)",
    url: "/profile/fundWallet",
    icon: <BiCreditCard />,
  },
  // {
  //   name: "Fund wallet(ATM CARD OR TRANSFER)",
  //   url: "/profile/fundwallet_flutterwave",
  //   icon: <BiCreditCard />,
  // },
  // {
  //   name: "Electricity Payment ",
  //   url: "/profile/electricity",
  //   icon: <FaLightbulb />,
  // },
  // {
  //   name: "TV subscriptions",
  //   url: "/profile/tv",
  //   icon: <FiMonitor />,
  // },
  {
    name: "Transactions",
    url: "/profile/transactions",
    icon: <BiReceipt />,
  },
  {
    name: "Transfer to other User",
    url: "/profile/transfer",
    icon: <RiRefund2Fill />,
  },

  {
    name: "Account",
    url: "/profile/user",
    icon: <BsFillPersonFill />,
  },
  {
    name: "Settings",
    url: "/profile/changePassword",
    icon: <RiSettings5Fill />,
  },
];
export const adminSideBarButton = [
  {
    name: "Send email",
    url: "/admin/sendMail",
    icon: <BsFillPersonFill />,
  },
  {
    name: "my suers",
    url: "/admin/users",
    icon: <BsFillPersonFill />,
  },
  {
    name: "users transactions",
    url: "/admin/transactions",
    icon: <RiSettings5Fill />,
  },
  {
    name: "generate Coupon",
    url: "/admin/generateCoupon",
    icon: <RiSettings5Fill />,
  },
];
