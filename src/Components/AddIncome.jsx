import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { singleIncomeDetails } from "../Services/allapi";
function AddIncome({ getIncome, removeIncome, updateIncome,singleIncome,setSingleIncome }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
      setOpen(false);
    };

    const getSingleIncome =async(id)=>{
        const {data} = await singleIncomeDetails(id)
        setSingleIncome(data)
    }
  return (

    <>
      <div
        className=" w-100  ml-12  content ma"
        style={{ maxHeight: "42vh", overflowY: "auto" }}
      >
        <table style={{ maxWidth: "100%" }}>
          <thead>
            <tr className="shadow-xl" style={{ backgroundColor: "#9701A9" }}>
              <th className="px-12 py-4  text-white  font-bold  ">#</th>
              <th className="px-12 py-4  text-white  font-bold ">Date</th>
              <th className="px-12 py-4  text-white  font-bold ">Expense</th>
              <th className="px-12 py-4  text-white  font-bold ">Amount</th>
              <th className="px-12  py-4  text-white  font-bold  ">Action</th>
            </tr>
          </thead>
          <tbody>
            {getIncome?.length > 0 ? (
              getIncome?.map((item, index) => {
                return (
                  <tr className=" shadow-xl mb-4 bg-white" key={item.id}>
                    {/* Table row content */}
                    <td className="px-12 py-4">{index + 1}</td>
                    <td className="px-12 py-4">
                      <input
                        type="date"
                        className=" focus:outline-transparent"
                        value={item?.date}
                      />
                    </td>
                    <td className="px-12 py-4">{item?.Income}</td>
                    <td className="px-12 py-4">&#8377;{item?.Amount} </td>
                    <td className="px-12 py-4">
                      <button
                        className=" font-bold text-white rounded mr-3 p-1"
                        style={{ backgroundColor: "#f1c40f" }}
                      >
                        <AiFillEdit className="text-xl" onClick={() => { getSingleIncome(item?.id);setOpen(true)}} />
                      </button>
                      <button 
                        className=" text-white  font-bold rounded  mr-3 p-1"
                        onClick={() => { removeIncome(item.id)}}
                        style={{ backgroundColor: "#7b2cbf" }}
                      >
                        <AiFillDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p className="text-2xl text-red-500">Nothing to display!!</p>
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
          value={singleIncome.date}
          onChange={(e)=>{setSingleIncome({...singleIncome,date:e.target.value})}}
          />
          <p className="text-red-500 ">{}</p>
          <TextField
            id="outlined-basic1"
            label="Expense"
            variant="outlined"
            type="text"
            fullWidth
            margin="dense"
            value={singleIncome.Income}
          onChange={(e)=>{setSingleIncome({...singleIncome,Income:e.target.value})}}
            
          />
          <p className="text-red-500">{}</p>
          <TextField
            id="outlined-basic2"
            label="Amount"
            variant="outlined"
            type="text"
            fullWidth
            margin="dense"
            value={singleIncome.Amount}
          onChange={(e)=>{setSingleIncome({...singleIncome,Amount:e.target.value})}}
           
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
              updateIncome(singleIncome.id);
              setOpen(false)
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

export default AddIncome;
