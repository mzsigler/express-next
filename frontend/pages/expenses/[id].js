import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../Components/Header";
import { TableStyle } from "../../styles/TableStyle";
import { TotalStyle } from "../../styles/TotalStyle";


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