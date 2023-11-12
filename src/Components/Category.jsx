import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus ,AiFillCloseSquare,AiFillPlusSquare} from "react-icons/ai";
import {
  addCAtegories,
  deleteCategories,
  getCategoryDetails,
  getSingleExpenseDetails,
  updateCategory,
} from "../Services/allapi";
import { toast } from "react-toastify";

function Category() {
  const [open, setOpen] = React.useState(false);
  const [addCategory, setAddCategory] = useState({ cate: "", image: "" });
  const [categoryError, setCategoryError] = useState({ cate: "", image: "" });
  const [dataFromResponse, setDataFromResponse] = useState([]);
  const [openPannel,setOpenPannel]= useState(null)


  const openToggle = (i)=>{
    if (openPannel === i){
      setOpenPannel(null)
    }else{
      setOpenPannel(i)
    }
  }
  



  const categoryDetailsPost = async () => {
    if (validateCategory()) {
      const response = await addCAtegories({
        ...addCategory,
        allExpense: [],
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success("New Category Successfully added");
        setAddCategory({ cate: "", image: "" });
        setOpen(false);
      } else {
        toast.error("Failed to add a new category. Please try again.");
      }
    }
  };

  const displayCategory = async () => {
    const { data } = await getCategoryDetails();
    setDataFromResponse(data);
  };

  useEffect(() => {
    displayCategory();
  }, [dataFromResponse]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const UploadDCAtegoryDetails = () => {
    if (validateCategory()) {
      setOpen(false);
      categoryDetailsPost();
      setAddCategory({ cate: "", image: "" });
    }
  };

  const validateCategory = () => {
    let valid = true;
    const { cate, image } = addCategory;
    const newCategory = { ...categoryError };

    // validating category
    if (cate === "") {
      newCategory.cate = "please fill the form";
      valid = false;
    } else {
      newCategory.cate = "";
    }

    // validating image

    if (image === "") {
      newCategory.image = "*Required";
      valid = false;
    }
    else if(!image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
      newCategory.image ="*Invalid url";
      valid = false;
    } else {
      newCategory.image = "";
    }
    setCategoryError(newCategory);
    return valid;
  };

  const dropOver = (e) => {
    e.preventDefault();
  };
const removeCategory= async(id) =>{
     await deleteCategories(id)
}
  const videoDrop = async (e, categoryId) => {
    const tableId = e.dataTransfer.getData("TableId");

    //get sleceted table details
    const { data } = await getSingleExpenseDetails(tableId);

    let selectedCategory = dataFromResponse.find(
      (item) => item.id === categoryId
    );
    selectedCategory.allExpense.push(data);
    await updateCategory(categoryId, selectedCategory);
    displayCategory();
  };

  return (
    <div className=" w-full h-full bg-white rounded-md mt-16 ">
      <div className="flex justify-between pt-3 px-3  ">
        <h2 className="   text-2xl font-bold " style={{fontFamily:'Roboto ,sans'}}>Category</h2>
        <Button
          style={{ backgroundColor: "#9701A9", color: "white" }}
          onClick={handleClickOpen}
        >
          {" "}
          <AiOutlinePlus /> Add Category
        </Button>
      </div>
     
        
        <div className="grid md:grid-cols-1  xl:grid-cols-1 gap-4 pl-20 mt-3 pr-4 pb-4 text-center overflow-y-auto h-4/5  ">
          {dataFromResponse?.length > 0 ? (
            dataFromResponse?.map((item) => {
              return (
                <div className="flex-col   ">
                  <Card
                    key={item.id}
                    style={{  borderColor: '#9701A9', borderWidth: '2px', borderStyle: 'solid',paddingTop:'45px' ,paddingBottom:'40px'}}
                    sx={{
                      width: 244,
                      height: 44,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      
                    }}
                    droppable
                    onDragOver={(e) => {
                      dropOver(e);
                    }}
                    onDrop={(e) => {
                      videoDrop(e, item?.id);
                    }}
                    
                  >
                    
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
<div className="flex justify-between  ">
                        <AiFillCloseSquare className="text-red-700" onClick={()=>{removeCategory(item.id)}}/>
                         <AiFillPlusSquare className="ml-48 text-red-700" onClick = {()=>{openToggle(item?.id)}}/>
  
</div>                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                        color="text.black"
                        style={{ fontFamily: "solvay" }}
                      >
                        {item.cate}
                      </Typography>
                      <img
                        src={item.image}
                        alt=""
                        height={"20px"}
                        width={"20px"}
                      />
                    </CardContent>
                    
                  </Card>
                 

                    { openPannel === item?.id &&
                      
                      <div className="grid sm-grid-cols-1 grid-cols-3  gap-10 pt-2 -ml-16 me-1">
                    {
                     item?.allExpense.map((categ=>{
                      return(
                        <Card key={categ.id}
                   
                    style={{ backgroundColor: "#000000",paddingTop:'40px' ,paddingBottom:'30px'}}
                    sx={{
                      width: 144,
                      height: 144,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      color:'white',
                      border:'3px solid #9701A9'
                      
                    }}
                    
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                        color="text.black"
                        style={{ fontFamily: "solvay" }}
                        
                      > &#8377; {categ?.Amount}
                         
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                        color="text.black"
                        style={{ fontFamily: "solvay" }}
                       
                        
                      >
                      {categ?.date}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                        color="text.black"
                        style={{ fontFamily: "solvay" }}
                       
                      >{categ?.Expense.slice(0,12)}
                        
                      </Typography>
                     
                    </CardContent>
                    
                  </Card>
                      )
                     }))
                      
                  
                  }
                    </div>}
                    <div>

                    </div>
                  
                  
                </div>
              );
            })
          ) : (
            <p className="text-center text-red-500 text-lg">No Category Added</p>
          )}
        </div>
        
      

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Please Enter category"
            value={addCategory.cate}
            onChange={(e) => {
              setAddCategory({ ...addCategory, cate: e.target.value });
            }}
          />
          <p className="text-red-600"> {categoryError.cate}</p>
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Please Enter Image Url"
            value={addCategory.image}
            onChange={(e) => {
              setAddCategory({ ...addCategory, image: e.target.value });
            }}
          />
          <p className="text-red-600"> {categoryError.image}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={UploadDCAtegoryDetails}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Category;
