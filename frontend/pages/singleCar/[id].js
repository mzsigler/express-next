import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../Components/Header";
import styled from "styled-components";

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

const SingleCarStyle = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 2rem;
    background: darkblue;
    border: 1px solid cornflowerblue;
    border-radius: 10px;
`

export default function SingleCar(){

    let expenseTotal;
    let incomeTotal; 
    let daysOnline;
    let netPerDay; 

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
        const added = Date.parse(data.car.dateAdded);
        const today = Date.now();
        daysOnline = Math.floor((today - added) / (1000 * 3600 * 24));
        netPerDay = ((incomeTotal - expenseTotal) / daysOnline).toFixed(2);

    }

    return(
        <div>
            <Header />
        {data && 
        <div className="singleCar">
            <SingleCarStyle>
            <p>{data.car.inv}</p>
            <p>{data.car.year}</p>
            <p>{data.car.make}</p>
            <p>{data.car.model}</p>
            <p>{data.car.vin}</p>
            <p>Total Expenses: {expenseTotal} <button>View</button></p>
            <p>Total Income: {incomeTotal} <button>View</button></p>
            <p>Net: ${(incomeTotal - expenseTotal).toFixed(2)} </p>
            <p>Days Online: {daysOnline}</p>
            <p>Net Per Day: {netPerDay}</p>
            </SingleCarStyle>
        </div>
        }

        </div>
    )
}