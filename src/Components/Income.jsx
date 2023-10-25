import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { getTotalIncome, updateTotalIncome } from "../Services/allapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Income({ getExpense }) {
  const [dataIncome,setDataIncome]=useState("")
  const [incomeValue, setIncomeValue] = useState(
    {
     income:''
    }
  );
  const [incomeInput,setIncomeInput] = useState(false)
  

  const totalExpense = getExpense
  .map((item) => parseFloat(item.Amount)) // Convert "Amount" strings to numbers
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
 const Balance =dataIncome?.income -totalExpense 

   const totalIncome = async() =>{
      const response = await updateTotalIncome(incomeValue)
      if(response.status>=200 && response.status<300){
          toast.success("income Added")
          setIncomeValue({
            income:''
          })
          setIncomeInput(false)
      }else{
        toast.error("Erorr occured")
      }
  }

   const display= async()=>{
    const {data} = await getTotalIncome()
    setDataIncome(data)
   
   }

   useEffect(()=>{display()},[
    dataIncome
   ])


 
 


  return (
    <div className=" w-98 h-1/5   bg-custom-pink shadow-xl rounded-lg pt-8 ml-3 ">
      {
        <>
          <p className="text-4xl text-neutral-500 pl-10 inline-block"> Total Balance
            &#8377;{Balance}

            
           
          </p>
          <div className="px-12 flex justify-between pt-6">
            <p className="font-bold text-green-700">
              {" "}
              {
                 
                incomeInput ?  <> <input type="text"id="icome" value={incomeValue?.income}  onChange={(e)=>{setIncomeValue({
                  income:e.target.value 
                })}} /> 
                  <button className=" bg-black ml-2 px-3 rounded-md" onClick={totalIncome} >
                    save
                  </button>  <button className=" bg-black ml-2 px-3 rounded-md" onClick={()=>{setIncomeInput(false)}} >
                     cancel
                  </button>
                </>: <span>Total Income &#8377;{dataIncome?.income}</span>
              } <label htmlFor="icome">
              {" "}
              <AiFillEdit className="inline-block" onClick={()=>{setIncomeInput(true)}}/>
            </label>{" "}
             
            </p>
            
                    <p className="font-bold text-red-500">
                      Total Expense &#8377;{totalExpense}
                    </p>
                  
          </div>
        </>
      }
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

export default Income;
