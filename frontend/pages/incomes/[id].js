import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../Components/Header";
import { TableStyle } from "../../styles/TableStyle";
import { TotalStyle } from "../../styles/TotalStyle";

const INCOME_QUERY = gql`
    query($id: ID!){
        incomes(where: {car: {id: {equals: $id}} }){
            closeDate,
            customer,
            amount,
            mileage,
        }
    }
`;



export default function Incomes(){

    const router = useRouter();
    const { id } = router.query;
    let total = 0;

    const {data, loading, error} = useQuery(INCOME_QUERY, {
        variables: {
            id
        }
    });

    if(data){
        const incomes = data.incomes.map(expense => expense.amount);
        total = incomes.reduce((start, i) => start + i, 0);
    }

    console.log(data);

    
    return(
        <div>
            <Header />
            <TableStyle>
                    <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Mileage</th>
                        <th>Amount</th>
                    </tr>
                    
                    {data && data.incomes.map(income => {
                return(
                    <tr key={income.id}>
                    <td>{income.date}</td>
                    <td>{income.customer}</td>
                    <td>{income.mileage}</td>
                    <td>${income.amount}</td>
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