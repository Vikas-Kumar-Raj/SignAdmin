import {
  FaHome,
  FaUsers,
  FaSignature,
  FaMoneyBill,
  FaBox,
  FaCog,
} from "react-icons/fa";

export const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    id: 2,
    title: "Users",
    path: "/users",
    icon: FaUsers,
  },
  {
    id: 3,
    title: "Signatures",
    path: "/signatures",
    icon: FaSignature,
  },
  {
    id: 4,
    title: "Transactions",
    path: "/transactions",
    icon: FaMoneyBill,
  },
  {
    id: 5,
    title: "Plans",
    path: "/plans",
    icon: FaBox,
  },
  {
    id: 6,
    title: "Settings",
    path: "/settings",
    icon: FaCog,
  },
];