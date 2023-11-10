import React from "react";
import {
  AiTwotoneHome,
  AiTwotoneHeart,
  AiTwotoneSecurityScan,
} from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { VscGraphLine } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";
function Side() {
  const sideBar = [
    <AiTwotoneHome />,
    <AiTwotoneHeart />,
    <AiTwotoneSecurityScan />,
    <VscGraphLine />,
    <IoMdSettings />,
    <HiOutlineLogout />,
  ];

  const array = sideBar.slice(0, 4);
  const arr = sideBar.slice(-2);
  return (
    <div
      className="flex-col min-w-fit  rounded-r-lg" 
      style={{ width: "5%" ,backgroundColor:'#9701A9'}}
    >
      
        <ul className="pt-40 pl-5 sm:pr-6">
          {array.map((item, index) => {
            return (
              <li
                key={index}
                className="text-2xl mb-4   w-100 text-white font-thin cursor-pointer "
              >
                {item}
              </li>
            );
          })}
        </ul>
      
      
        <ul className="pt-20 pl-5">
          {arr.map((item, index) => {
            return (
              <li
                key={index}
                className="text-2xl mb-4  text-white w-100 cursor-pointer"
              >
                {item}
              </li>
            );
          })}
        </ul>
      
    </div>
  );
}

export default Side;
