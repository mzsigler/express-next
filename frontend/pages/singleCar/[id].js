import { useQuery, gql } from "@apollo/client";
import { concatAST } from "graphql";
import { useRouter } from "next/router";
import CarCard from "../../Components/CarCard";
import Header from "../../Components/Header";

const SINGLE_CAR_QUERY = gql`
    query($id: ID!){
        car(where: {id: $id}){
            id, 
            year, 
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
            <p>Total Expenses: {expenseTotal}</p>
            <p>Total Income: {incomeTotal} <button>View</button></p>
            <p>Net: {incomeTotal - expenseTotal} <button>View</button></p>
        </div>
        }

        </div>
    )
}