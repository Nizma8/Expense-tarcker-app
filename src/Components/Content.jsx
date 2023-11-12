import React, { useEffect, useState } from "react";
import Category from "./Category";
import Add from "./Add";
import Income from "./Income";

import {
  UpdateExpense,
  deleteExpenseDetails,
  deleteIncome,
  editIncome,
  getExpenseDetails,
  getIncomeDetails,
  getSingleExpenseDetails,
} from "../Services/allapi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableExpense from "./TableExpense";
import TabPanel from "./TabPanel";
import AddIncome from "./AddIncome";

function Content() {
  
  const [getExpense, setGEtExpense] = useState([]);
  const [onAddExpense, setOnAddExpense] = useState({});
  const [singleExpense, setSingleExpense] = useState({});
  const[activeTab,setActiveTab]=useState("tab1")
  const [getIncome, setGetIncome] = useState([]);
  const [onAddIncome,setOnAddIncome]=useState([])
  const [singleIncome,setSingleIncome]=useState({})

  const getAllExpense = async () => {
    const { data } = await getExpenseDetails();
    setGEtExpense(data);
  };
  const getIncomeDet =async ()=>{
    const {data}=await getIncomeDetails()
    setGetIncome(data)
  }

  const deleteExpense = async (id) => {
  await deleteExpenseDetails(id);
    getAllExpense()
  };


  const removeIncome = async(id)=>{
   await deleteIncome(id);
   getIncomeDet()

  }

  const startDragg = (e, id) => {
    e.dataTransfer.setData("TableId", id);
console.log("inside dragg function",id);
  };
  

  const expenseSingleDetails = async (id) => {
    const { data } = await getSingleExpenseDetails(id);
    setSingleExpense(data);
  };

  
  const editExpense = async (id) => {
     await UpdateExpense(id, singleExpense);
    getAllExpense()
   
  };

  const updateIncome =async (id)=>{
   await editIncome(id,singleIncome);
    getIncomeDet()
   
  }

  useEffect(() => {
    getAllExpense()
  }, [onAddExpense]);
useEffect(()=>{
  ;getIncomeDet();
},[onAddIncome])
  return (
    <div
      className="h-screen flex justify-between flex-col md:flex-row md:space-x-4  "
      style={{ width: "calc(100vw - 5%)" }}
    >
      <div className="w-full md:w-2/3  h-full ">
        
        <Income getExpense={getExpense} getIncome={getIncome} />
        <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} / >
        <div className="outlet">
        {activeTab=== "tab1" ? <TableExpense
            getExpense={getExpense}
            getAllExpense={getAllExpense}
            startDragg={startDragg}
            expenseSingleDetails={expenseSingleDetails}
            deleteExpense={deleteExpense}
            singleExpense={singleExpense} setSingleExpense={setSingleExpense} editExpense={editExpense} 
            setGEtExpense={setGEtExpense}
          />: <AddIncome getIncome={getIncome}  removeIncome={ removeIncome}  updateIncome ={ updateIncome }  singleIncome={singleIncome} setSingleIncome={setSingleIncome}/>
        }
         
          
        </div>

       { <Add setOnAddExpense={setOnAddExpense} setOnAddIncome={setOnAddIncome} title= {activeTab==="tab1"?"Add Expense":"Add Income"} />}
      </div>
      <div className="w-full md:w-1/3 " style={{ maxHeight: "90vh" }}>
        <Category />
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Content;
