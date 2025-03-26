import React from "react";
import { FaHome, FaLightbulb } from "react-icons/fa";
import { GiNetworkBars } from "react-icons/gi";
import { BiCreditCard, BiReceipt } from "react-icons/bi";
import { RiSettings5Fill, RiRefund2Fill } from "react-icons/ri";
import { BsFillPersonFill, BsPeopleFill } from "react-icons/bs";
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

  // {
  //   name: "Fund wallet(ATM CARD OR TRANSFER)",
  //   url: "/profile/fundWallet",
  //   icon: <BiCreditCard />,
  // },
  // {
  //   name: "Fund wallet(ATM CARD OR TRANSFER)",
  //   url: "/profile/fundwallet_flutterwave",
  //   icon: <BiCreditCard />,
  // },
  {
    name: "Electricity Payment ",
    url: "/profile/electricity",
    icon: <FaLightbulb />,
  },

  {
    name: "My contacts",
    url: "/profile/contacts",
    icon: <BsPeopleFill />,
  },
  {
    name: "Transactions",
    url: "/profile/transactions",
    icon: <BiReceipt />,
  },
  // {
  //   name: "Earnings",
  //   url: "/profile/earnings",
  //   icon: <BiReceipt />,
  // },

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
    name: "admin settings",
    url: "/profile/adminSettings",
    icon: <BiCreditCard />,
  },
  {
    name: "Update price",
    url: "/profile/updatePrice",
    icon: <BiCreditCard />,
  },
  {
    name: "Transfer ",
    url: "/profile/transfer",
    icon: <RiRefund2Fill />,
  },

  {
    name: "Send email",
    url: "/admin/sendMail",
    icon: <BsFillPersonFill />,
  },
  {
    name: "my users",
    url: "/admin/users",
    icon: <BsFillPersonFill />,
  },
  {
    name: "Fund wallet(COUPON)",
    url: "/profile/fundWallet/coupon",
    icon: <BiCreditCard />,
  },
  {
    name: "generate Coupon",
    url: "/admin/generateCoupon",
    icon: <RiSettings5Fill />,
  },
];
export const agentSideBarButton = [
  {
    name: "my users",
    url: "/admin/users",
    icon: <BsFillPersonFill />,
  },
  {
    name: "Update",
    url: "/profile/updatePrice",
    icon: <BiCreditCard />,
  },
];
