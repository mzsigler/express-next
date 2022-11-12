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

const TotalStyle = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 1rem;
`




export default function SingleExpense(){

    const router = useRouter();
    const { id } = router.query;
    let total = 0;

    const {error, loading, data} = useQuery(EXPENSE_QUERY, {
        variables: {
            id
        }
    });

    console.log(data)

    if(data){
        const expenses = data.expenses.map(expense => expense.amount);
        total = expenses.reduce((start, i) => start + i, 0);
    }

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
                <TotalStyle>
                   Total: ${total}
                </TotalStyle>
            
        </div>
    )
}