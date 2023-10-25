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
      className="   flex-col min-w-fit "
      style={{ width: "5%", height: "calc(100vh - 3rem)" }}
    >
      <div className="border border-b-0  rounded-r-lg bg-custom-pink h h-3/5">
        <ul className="pt-40 pl-5 sm:pr-6">
          {array.map((item, index) => {
            return (
              <li
                key={index}
                className="text-2xl mb-4   w-100 text-white cursor-pointer hover:text-custom-pink1"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-custom-pink h-2/5">
        <ul className="pt-20 pl-5">
          {arr.map((item, index) => {
            return (
              <li
                key={index}
                className="text-2xl mb-4   w-100 text-white hover:text-custom-pink1 cursor-pointer"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Side;
