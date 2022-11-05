import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../Components/Header";

const SINGLE_CAR_QUERY = gql`
    query($id: ID!){
        car(where: {id: $id}){
            id, 
            year, 
            dateAdded,
            make, 
            model,
            vin,
            inv,
            expense {
                amount
            },
            income {
                amount
            }
        }
    }
`

export default function SingleCar(){

    let expenseTotal;
    let incomeTotal; 

    const router = useRouter();
    const { id } = router.query;

    const {error, loading, data} = useQuery(SINGLE_CAR_QUERY, {
        variables: {
            id
        }
    });

    if(data){
        const expenses = data.car.expense;
        const amounts = expenses.map(expense => expense.amount);
        expenseTotal = amounts.reduce((start, i) => start + i, 0);

        const income = data.car.income;
        const incomeAmounts = income.map(income => income.amount);
        incomeTotal = incomeAmounts.reduce((start, i) => start + i, 0);
        console.log(data.car.dateAdded);
        const added = new Date(data.car.dateAdded);
        const today = Date.now();
        const todayDate = new Date(today);
        console.log(added);
        console.log(todayDate);

    }

    return(
        <div>
            <Header />
        {data && 
        <div className="singleCar">
            <p>{data.car.inv}</p>
            <p>{data.car.year}</p>
            <p>{data.car.make}</p>
            <p>{data.car.model}</p>
            <p>{data.car.vin}</p>
            <p>Total Expenses: {expenseTotal} <button>View</button></p>
            <p>Total Income: {incomeTotal} <button>View</button></p>
            <p>Net: ${(incomeTotal - expenseTotal).toFixed(2)} </p>
        </div>
        }

        </div>
    )
}