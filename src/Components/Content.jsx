import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Category from "./Category";
import Add from "./Add";
import Income from "./Income";
import {  UpdateExpense, deleteExpenseDetails, getExpenseDetails, getSingleExpenseDetails } from "../Services/allapi";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Content() {
  const [open, setOpen] = React.useState(false);

 const [getExpense,setGEtExpense] = useState([])
 const [onAddExpense,setOnAddExpense] = useState({})
 const [deletedResponse,setDeltedResponse] = useState({})
 const [singleExpense,setSingleExpense] = useState({})
 const[dataFromEdit,setDataFromEdit] = useState({})
const handleClose = () => {
  setOpen(false);
};
  const getAllExpense = async()=>{
   const {data} =  await getExpenseDetails()
   setGEtExpense(data)
  }

  const deleteExpense = async(id)=>{
    const {data} = await deleteExpenseDetails(id)
    setDeltedResponse(data)
  }
  
 const startDragg=(e,id)=>{
    
    e.dataTransfer.setData("TableId",id)
  }
  const expenseSingleDetails=async (id)=>{
   const {data} = await getSingleExpenseDetails(id)
   setSingleExpense(data)
   setOpen(true);
  }
  console.log(singleExpense);

const editExpense = async(id)=>{
 const response = await UpdateExpense(id,singleExpense)
  setOpen(false)
  setDataFromEdit(response.data)
  if(response.status>=200 && response.status<300){
  toast.success("Edited successfully")
  }else{
    toast.error("Error Occurred")
  }

}


  useEffect (()=>{
    getAllExpense()
    
  },[onAddExpense,deletedResponse,dataFromEdit])

  return (
    <div className="h-100 flex justify-between flex-col md:flex-row md:space-x-4  " style={{ width: "calc(100vw - 5%)" }}>
      <div className="  w-full md:w-2/3 bg-neutral-100 p-4 " >
        
<Income getExpense={getExpense}/>
        <div
          className="h-3/5 w-100  ml-12  "
          style={{ Height: "50%", overflowY: "auto" }}
        >
          <table className="w-100">
            <thead>
              <tr className="shadow-xl  bg-custom-pink">
                <th className="px-12 py-4  ">#</th>
                <th className="px-12 py-4">Date</th>
                 <th className="px-12 py-4">Expense</th>
                <th className="px-12 py-4">Amount</th>
                <th className="px-12  py-4 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {getExpense?.length>0?getExpense?.map((item,index)=>{
                return (
                  <tr className="bg-custom-light-pink shadow-xl mb-4"  draggable="true" key={item.id} onDragStart={(e)=>{startDragg(e,item?.id)}}>
                  {/* Table row content */}
                  <td className="px-12 py-4">{index+1}</td>
                  <td className="px-12 py-4">
                    <input type="date" className="bg-custom-light-pink focus:outline-transparent" value={item.date} />
                  </td>
                 <td className="px-12 py-4">{item.Expense}</td>
                  <td className="px-12 py-4">&#8377; {item.Amount}</td>
                  <td className="px-12 py-4">
                    <button className="bg-rose-400 hover:bg-rose-600 text-white font-bold  rounded mr-3 p-1" >
                      <AiFillEdit className="text-xl" onClick={()=>expenseSingleDetails(item?.id)} />
                    </button>
                    <button className="bg-pink-400 hover:bg-pink-600 text-white font-bold rounded  mr-3 p-1" onClick={()=>{deleteExpense(item?.id)}}>
                      <AiFillDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
                )
              }):<p className="text-red-500 text-center text-lg">nothing to display!!!</p>
                
               }
              
            </tbody>
          </table>
        </div>
        <div className=" flex justify-center items-center">
          <Add setOnAddExpense={setOnAddExpense} />
        </div>
      </div>
      <div className="w-full md:w-1/3 ">
        <Category/>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">Add Expense</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="outlined-basic"
            variant="outlined"
            type="date"
            fullWidth
            margin="dense"
             value={singleExpense.date}
             onChange={(e)=>{setSingleExpense({...singleExpense,date:e.target.value})}}
            
          />
          <p className="text-red-500 ">{}</p>
          <TextField
            id="outlined-basic1"
            label="Expense"
            variant="outlined"
            type="text"
            fullWidth
            margin="dense"
            value={singleExpense.Expense}
             onChange={(e)=>{setSingleExpense({...singleExpense,Expense:e.target.value})}}
          />
          <p className="text-red-500">{}</p>
          <TextField
            id="outlined-basic2"
            label="Amount"
            variant="outlined"
            type="text"
            fullWidth
            margin="dense"
            value={singleExpense.Amount}
            onChange={(e)=>{setSingleExpense({...singleExpense,Amount:e.target.value})}}
          />
          <p className="text-red-500 ">{}</p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="bg-neutral-500 p-3 rounded-lg me-3 text-white"
          >
            Cancel
          </button>
          
            <button
            onClick={()=>{editExpense(singleExpense.id)}}
            className="bg-amber-500 p-3 rounded-lg me-3 text-white"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
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
