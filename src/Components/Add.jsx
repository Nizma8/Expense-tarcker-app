import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { uploadExpense, uploadIncome } from "../Services/allapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add({setOnAddExpense,title,setOnAddIncome}) {
  const [open, setOpen] = React.useState(false);
  const [inputErrors, setInputErrors] = useState({
    dateError: "",
    ExpenseError: "",
    AmountError: "",
  });
  const [incomeInput, setincomeInput] = useState({
    date: "",
    Income: "",
    Amount: "",
  });
  const [incomeErrors, setIncomeErrors] = useState({
    dateError: "",
    IncomeError: "",
    AmountError: "",
  });
  const [userInput, setUserInput] = useState({
    date: "",
    Expense: "",
    Amount: "",
  });


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
   
  };
  const handleUpload = async () => {
    if (validateForm()) {
      const response = await uploadExpense(userInput);
      if (response.status >= 200 && response.status < 300) {
        setUserInput({
          date: "",
          Expense: "",
          Amount: "",
        });
        toast.success(`New Expense is uploaded succesfully`);
        setOpen(false);
        setOnAddExpense(response.data)
      } else {
        toast.error("Uploading error!! please try after sometime");
      }
    }
    
  };


  const handleUploadIncome =async()=>{
     const response = await uploadIncome(incomeInput)
     if (response.status >= 200 && response.status < 300) {
      setincomeInput({
        date: "",
        Income: "",
        Amount: "",
      });
      setOnAddIncome(response.data)
      
      toast.success(`New Expense is uploaded succesfully`);
      setOpen(false);
    } else {
      toast.error("Uploading error!! please try after sometime");
    }

  }
  const close =()=>{
    setIncomeErrors({
      dateError: "",
      IncomeError: "",
      AmountError: "",
    })
    setOpen(false)
  }

  const validateForm = () => {
    let valid = true;
    const { date, Expense, Amount } = userInput;
    const newError = { ...inputErrors };
    // validate date
    if (date === "") {
      newError.dateError = "* Required";
      valid = false;
    } else {
      newError.dateError = "";
      valid = true;
    }
    // validate expense
    if (Expense === "") {
      newError.ExpenseError = "* Required";
      valid = false;
    } else {
      newError.ExpenseError = "";
      valid = true;
    }

    // validate Amount

    if (Amount === "") {
      newError.AmountError = "* Required";
      valid = false;
    } else if (!Amount.match(/^[0-9]+$/)) {
      newError.AmountError = "Invalid Amount";
      valid = false;
    } else {
      newError.AmountError = "";
      valid = true;
    }

    setInputErrors(newError);
    return valid;
  };

  return (
    <div className=" flex justify-center items-center ">
      <button
        className=" p-2 rounded-full border hover:scale-110 transition ease-in-out delay-75" style={{backgroundColor:"#9701A9"}}
        onClick={handleClickOpen}
      >
        <AiOutlinePlus className="text-2xl font-extrabold text-white" />
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">{title}</DialogTitle>

     {
      title==="Add Expense" ? <>
        <DialogContent>
        <TextField
          autoFocus
          id="outlined-basic"
          variant="outlined"
          type="date"
          fullWidth
          margin="dense"
          value={userInput.date}
          onChange={(e) => {
            setUserInput({ ...userInput, date: e.target.value });
          }}
        />
        <p className="text-red-500 ">{inputErrors.dateError}</p>
        <TextField
          id="outlined-basic1"
          label="Expense"
          variant="outlined"
          type="text"
          fullWidth
          margin="dense"
          value={userInput.Expense}
          onChange={(e) => {
            setUserInput({ ...userInput, Expense: e.target.value });
          }}
        />
        <p className="text-red-500">{inputErrors.ExpenseError}</p>
        <TextField
          id="outlined-basic2"
          label="Amount"
          variant="outlined"
          type="text"
          fullWidth
          margin="dense"
          value={userInput.Amount}
          onChange={(e) => {
            setUserInput({ ...userInput, Amount: e.target.value });
          }}
        />
        <p className="text-red-500 ">{inputErrors.AmountError}</p>
      </DialogContent>
      <DialogActions>
        <button
          onClick={close}
          className="bg-neutral-500 p-3 rounded-lg me-3 text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          className="bg-amber-500 p-3 rounded-lg me-3 text-white"
        >
          Save
        </button>
      </DialogActions>
      </>: <>   <DialogContent>
        <TextField
          autoFocus
          id="outlined-basic"
          variant="outlined"
          type="date"
          fullWidth
          margin="dense"
          value={incomeInput.date}
          onChange={(e)=>{setincomeInput({...incomeInput,date:e.target.value})}}
        />
        <p className="text-red-500 ">{incomeErrors.dateError}</p>
        <TextField
          id="outlined-basic1"
          label="Income"
          variant="outlined"
          type="text"
          fullWidth
          margin="dense"
          value={incomeInput.Income}
          onChange={(e)=>{setincomeInput({...incomeInput,Income:e.target.value})}}
        />
        <p className="text-red-500">{incomeErrors.IncomeError}</p>
        <TextField
          id="outlined-basic2"
          label="Amount"
          variant="outlined"
          type="text"
          fullWidth
          margin="dense"
          value={incomeInput.Amount}
          onChange={(e)=>{setincomeInput({...incomeInput,Amount:e.target.value})}}
        />
        <p className="text-red-500 ">{incomeErrors.AmountError}</p>
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          className="bg-neutral-500 p-3 rounded-lg me-3 text-white"
        >
          Cancel
        </button>
        <button onClick={handleUploadIncome}
          
        >
          Save
        </button>
      </DialogActions>
      </>
     
     }
       
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
        theme="light"
      />
    </div>
  );
}

export default Add;
