import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../Components/Header";
import styled from "styled-components";
import CarCard from "../../Components/CarCard";

const EXPENSE_QUERY = gql`
    query($id: ID!){
        expenses(where: {car: {id: {equals: $id}} }){
            date,
            vendor,
            amount,
            description
        }
    }
`;

const TableStyle = styled.table`
    background-color: darkblue;
    padding: 1rem;
    width: 80vw;
    margin-left: 10vw;
    border: 1px solid cornflowerblue;
    td{
        text-align: center;
    }
    th, tr {
        border: 1px solid cornflowerblue;
    }
`




export default function SingleExpense(){

    const router = useRouter();
    const { id } = router.query;

    const {error, loading, data} = useQuery(EXPENSE_QUERY, {
        variables: {
            id
        }
    });

    console.log(data)

    return(
        <div>
            <Header />
            <TableStyle>
                    <tr>
                        <th>Date</th>
                        <th>Vendor</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                    
                    {data && data.expenses.map(expense => {
                return(
                    <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.vendor}</td>
                    <td>{expense.description}</td>
                    <td>${expense.amount}</td>
                    </tr>
                )
            })}
                    
                </TableStyle>
        </div>
    )
}