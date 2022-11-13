import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Header from "../../Components/Header";

const PAYMENTS_QUERY = gql`
    query($id: ID!){
        balance(where: {id: $id}){
            id,
            name,
            returnDate,
            payment{
                paymentAmount,
                date,
            }
        }
    }
`;


export default function PaymentDetails(){

    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error } = useQuery(PAYMENTS_QUERY, {variables:
    { id }});

    console.log(data);


    return (
        <div>
        <Header />
            {data && data.balance.payment.map(payment => {
                return(
                    <div key={payment.id}>
                        <p>{payment.paymentAmount}</p>
                        <p>{payment.date}</p>
                    </div>
                )
            })}
        </div>
    )
}