import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Income({ getExpense,getIncome }) {


  


  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
const monthlyExpense = getExpense?.reduce((result,item)=>{
 const expenseDate = new Date(item.date)
 const monthExpense = monthNames[expenseDate.getMonth()]
 const  yearExpense = expenseDate.getYear()
 const monthkey = `${yearExpense}/${monthExpense}`
 
 if(!result[monthkey]){
  result[monthkey]=0
 }
  result[monthkey] += parseFloat(item.Amount)
  return result
 

},{})


const detailsMonth=Object.keys(monthlyExpense)


const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: 'black', // Change the color of x-axis labels
      },
    },
    y: {
      ticks: {
        color: 'black', // Change the color of y-axis labels
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Monthly Analysis of Income',
      color:'#fffff' ,
      // Set your custom title text
    },
  },
 
}
const chartData = {
  labels: detailsMonth.map(item=>item.split("/")[1]),
  datasets: [
    {
      label: 'Income',
      data: Object.values(monthlyExpense),
      borderColor: '#123499',
      backgroundColor: 'rgb(255, 99, 132) '// Customize the color
    },
  ],
}; 


  const totalExpense = getExpense
    .map((item) => parseFloat(item.Amount)) // Convert "Amount" strings to numbers
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const totalIncome =getIncome.map((item) => parseFloat(item.Amount)) // Convert "Amount" strings to numbers
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const Balance =totalIncome - totalExpense;



 

  return (
    <div
      className=" w-98    shadow-xl rounded-lg pt-8 ml-3 flex justify-between bg-white mt-16 pb-3" 
      
    >
      <div className=" w-1/2 pb-3 pl-8">
      <Line options={options} data={chartData} />
      </div>

      <div className=" w-1/3">
        {
          <>
            <p className="text-2xl  border mt-1 py-3 justify-around flex items-center shadow-lg rounded-lg text-white" style={{backgroundColor:'#9701A9',fontFamily:'Noto Serif Old Uyghur,sans-serif'}}>
              {" "}
              Totalbalance:&#8377;{Balance}
            </p>
            <div className="  mt-2 w-full flex  justify-around">
            

              <p className="font-bold border pr-2 pt-4 pl-4  text-white text-xl w-1/3  shadow-md rounded-sm" style={{backgroundColor:'#f1c40f',fontFamily:'Noto Serif Old Uyghur,sans-serif'}}>Total Expense &#8377;{totalExpense}</p>
              <p className="font-bold border pr-2 pt-4 pl-4 text-white text-xl  w-1/3 shadow-md rounded-sm" style={{backgroundColor:'#f1c40f',fontFamily:'Noto Serif Old Uyghur,sans-serif'}}>Total Income &#8377;{totalIncome}</p>
            </div>
          </>
        }
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

export default Income;
