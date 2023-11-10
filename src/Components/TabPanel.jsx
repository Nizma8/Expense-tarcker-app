import React from "react";

function TabPanel({ activeTab ,setActiveTab}) {

const handleClick1 = ()=>{
    setActiveTab("tab1")
}

const handleClick2 = ()=>{
    setActiveTab("tab2")
}

  return (
    <div className=" w-2/3 ml-40  my-5  ">
      <ul className="w-full flex bg-white shadow-md rounded">
        <li
          className={`${
            activeTab === "tab1"?"border-b-2 border-custom-purple":""
          }  w-1/2 list-none text-center py-2 cursor-pointer`}
         onClick={handleClick1}
        >
          Expense
        </li>

        <li
          className={`${
            activeTab === "tab2"?"border-b-2 border-custom-purple":""
          } w-1/2 list-none text-center py-2 cursor-pointer`}
          onClick={handleClick2}
        >
          Income
        </li>
      </ul>
    </div>
  );
}

export default TabPanel;
