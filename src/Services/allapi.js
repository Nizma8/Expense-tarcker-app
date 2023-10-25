import { base_url } from "./baseurl";
import { commonapi } from "./commonapi";

// uploading expense details to base_url/totalExpense

export const uploadExpense = async (expense)=>{
  return await commonapi("POST",`${base_url}/totalExpense`,expense)
}

// get expense details from bse_url/total expense

export const getExpenseDetails = async ()=>{
    return await commonapi("GET",`${base_url}/totalExpense`,"")
}


// to delete expense details from base_url/total expense

export const deleteExpenseDetails = async (id)=>{
    return await commonapi("DELETE",`${base_url}/totalExpense/${id}`,{})
}

// to get single expense details
export const getSingleExpenseDetails = async (id)=>{
  return await commonapi("GET",`${base_url}/totalExpense/${id}`,"")
}

// to edit expenses from base_url/total expense
export const ChangeExpenseDetails = async(id,exp)=>{
    return await commonapi("PUT",`${base_url}/totalExpense/${id}`,exp)
}

// uploding category details

export const addCAtegories =async (body)=>{
  return await commonapi("POST",`${base_url}/category`,body)
}

// to get category details

export const getCategoryDetails = async ()=>{
  return await commonapi("GET",`${base_url}/category`,"")
}

// to delete category details

export const deleteCategories =async (id)=>{
  return await commonapi("DELETE",`${base_url}/category/${id}`,{})
}

// update category 

export const updateCategory= async(id,updatedCategory)=>{
  return await commonapi("PUT",`${base_url}/category/${id}`,updatedCategory)
}

// updateExpenseDetails

export const UpdateExpense = async(id,updatedExpenseDet)=>{
  return await commonapi("PUT",`${base_url}/totalExpense/${id}`,updatedExpenseDet)
}

// update total income

export const updateTotalIncome = async (income)=>{
  return await commonapi("POST",`${base_url}/totalIncome`,income)
}

// get total income

export const getTotalIncome = async ()=>{
  return await commonapi("GET",`${base_url}/totalIncome`)
}
