import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Header from "../../Components/Header";
import styled from "styled-components";

const PAYMENTS_QUERY = gql`
    query($id: ID!){
        balance(where: {id: $id}){
            id,
            name,
            returnDate,
            payment{
                paymentAmount,
                date,
                method,
            }
        }
    }
`;

const BalancePaymentTableStyled = styled.table`
    width: 60%;
    background-color: darkblue;
    margin-left: 20%;
    padding: 1rem;
    text-align: center;
    td{
        border: 1px solid cornflowerblue;
        padding: 0.5rem;
    }
`
const StyledTotal = styled.span`
    padding: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    `


export default function PaymentDetails(){

    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error } = useQuery(PAYMENTS_QUERY, {variables:
    { id }});

    let totalPayments = 0;

    if(data){
       const payments = data.balance.payment.map(payment => payment.paymentAmount);
        totalPayments = payments.reduce((start, i) => start + i, 0);
    };

    return (
        <div>
        <Header />
            <BalancePaymentTableStyled>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                    </tr>
                </thead>
                {data && data.balance.payment.map(payment => {
                    return (
                        <tbody key={payment.date}>
                        <tr>
                            <td>{payment.date}</td>
                            <td>${payment.paymentAmount}</td>
                            <td>{payment.method}</td>
                        </tr>
                        </tbody>
                    );


                })}
            </BalancePaymentTableStyled>
            <StyledTotal>Total Payments: ${totalPayments}</StyledTotal>

        </div>
    )
}