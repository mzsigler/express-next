import Header from "../../Components/Header";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const BalDueStyle = styled.div`
    width: 60%;
    background-color: darkblue;
    padding: 2rem;
    margin-left: 20%;
    border: 1px solid cornflowerblue;
`


const SINGLE_BALANCE_QUERY = gql`
    query($id: ID!){
        balance(where: {id: $id}){
            balanceAmount,
            name,
            dateOfBirth,
            driverLicenseNumber,
            SSN,
            phone,
            employer,
            employerPhone,
            localContactName,
            localContactPhone,
            returnDate, 
            notes,
            payment{
              paymentAmount,
              date,
            },
        }
    }`


export default function BalDetails(){

    let totalPayments;
    let paidInFull = false;

    const router = useRouter();
    const { id } = router.query;



    const {data, loading, error} = useQuery(SINGLE_BALANCE_QUERY, {variables:{
        id
    }})

    
    if(data){
        const payments = data.balance.payment.map(payment => payment.paymentAmount);
        totalPayments = payments.reduce((start, i) => start + i, 0);
        if(totalPayments >= data.balance.balanceAmount){
            paidInFull = true;
        }
        
    }



    return (
        <div>
            <Header />

            {data && 
            <BalDueStyle>
                <h2> <strong>{data.balance.name}</strong></h2>
                <p>Amount: ${data.balance.balanceAmount}</p>
                <p>Return Date: {data.balance.returnDate}</p>
                <p>DOB: {data.balance.dateOfBirth}</p>
                <p>License Number: {data.balance.driverLicenseNumber}</p>
                <p>SSN: {data.balance.SSN}</p>
                <p>Employer: {data.balance.employer}</p>
                <p>Employer Phone: {data.balance.employerPhone}</p>
                <p>Local Contact: {data.balance.localContactName}</p>
                <p>Local Contact Phone: {data.balance.localContactPhone}</p>
                <p>Notes: {data.balance.notes}</p>
                <p>Total Payments: ${totalPayments}</p>
                <p>Current Balance: ${data.balance.balanceAmount - totalPayments}</p>
                <p>Paid in full? {paidInFull === true ? "Yes":"No"}</p>

            </BalDueStyle>}
            
            
        </div>
    )
}