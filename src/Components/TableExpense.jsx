import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SwappedExpenseDetails } from "../Services/allapi";
import { BsArrowDownUp } from "react-icons/bs";
function TableExpense({
  getExpense,
  startDragg,
  expenseSingleDetails,
  deleteExpense,
  singleExpense,
  setSingleExpense,
  editExpense,
  setGEtExpense,
}) {
  const [open, setOpen] = React.useState(false);
  const  [isClicked,setIsClicked]=useState(false)
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const dropOverr = (e) => {
    e.preventDefault();
  };
  const expenseDrop = async (e, ExpenseId) => {
    const tableId = e.dataTransfer.getData("TableId");
    // logic for swapping
    const updatedExpense = [...getExpense];

    // Swap elements
    let temp = updatedExpense[tableId];
    updatedExpense[tableId] = updatedExpense[ExpenseId];
    updatedExpense[ExpenseId] = temp;

    // Update the state with the swapped elements
    setGEtExpense(updatedExpense);

    //  Make the request with the updated state to store permenantly
    //  const reposne= await SwappedExpenseDetails(updatedExpense);
    // console.log(reposne);
    //  // to get updated expense
  };

const filter =()=>{
  const filteredExpense = [...getExpense]
  setIsClicked(!isClicked)
  if(isClicked){
    setGEtExpense(filteredExpense.map(item=>item).sort((a,b)=>b.Amount-a.Amount)
 )
  }else{
    setGEtExpense(filteredExpense.map(item=>item).sort((a,b)=>a.Amount-b.Amount))
  }

}

  return (
    <>
      <div
        className=" w-100  ml-12  content ma"
        style={{ maxHeight: "42vh", overflowY: "auto" }}
      >
        <table style={{ maxWidth: "100%", width: "100%" }}>
          <thead>
            <tr className="shadow-xl" style={{ backgroundColor: "#9701A9" }}>
              <th className="px-12 py-4   text-white  font-bold  ">#</th>
              <th className="px-12 py-4  text-white  font-bold ">Date</th>
              <th className="px-12 py-4  text-white  font-bold ">Expense</th>
              <th className="px-12 py-4 text-white font-bold ">
                <div className="inline-flex items-center">
                  <BsArrowDownUp className="mr-2 text-black" onClick={filter} /> Amount
                </div>
              </th>{" "}
              <th className="px-12  py-4  text-white  font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {getExpense?.length > 0 ? (
              getExpense?.map((item, index) => {
                return (
                  <tr
                    className=" shadow-xl mb-4 bg-white cursor-pointer"
                    draggable="true"
                    key={item.id}
                    onDragStart={(e) => {
                      startDragg(e, index);
                    }}
                    droppable
                    onDragOver={(e) => {
                      dropOverr(e);
                    }}
                    onDrop={(e) => expenseDrop(e, index)}
                  >
                    {/* Table row content */}
                    <td className="px-12 py-4">{index + 1}</td>
                    <td className="px-12 py-4">
                      <input
                        type="date"
                        className=" focus:outline-transparent"
                        value={item?.date}
                      />
                    </td>
                    <td className="px-12 py-4">{item?.Expense}</td>
                    <td className="px-12 py-4">&#8377; {item?.Amount}</td>
                    <td className="px-12 py-4">
                      <button
                        className=" font-bold text-white rounded mr-3 p-1"
                        style={{ backgroundColor: "#f1c40f" }}
                      >
                        <AiFillEdit
                          className="text-xl"
                          onClick={() => {
                            handleOpen();
                            expenseSingleDetails(item?.id);
                          }}
                        />
                      </button>
                      <button
                        className=" text-white  font-bold rounded  mr-3 p-1"
                        onClick={() => {
                          deleteExpense(item?.id);
                        }}
                        style={{ backgroundColor: "#7b2cbf" }}
                      >
                        <AiFillDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p className="text-red-500 text-center text-lg">
                nothing to display!!!
              </p>
            )}
          </tbody>
        </table>
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
            onChange={(e) => {
              setSingleExpense({ ...singleExpense, date: e.target.value });
            }}
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
            onChange={(e) => {
              setSingleExpense({ ...singleExpense, Expense: e.target.value });
            }}
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
            onChange={(e) => {
              setSingleExpense({ ...singleExpense, Amount: e.target.value });
            }}
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
            onClick={() => {
              editExpense(singleExpense.id);

              handleClose();
            }}
            className="bg-amber-500 p-3 rounded-lg me-3 text-white"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TableExpense;
