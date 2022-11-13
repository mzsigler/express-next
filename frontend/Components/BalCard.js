import styled from "styled-components";
import Link from "next/link";

const StyledBalDiv = styled.div`
    padding: 1rem;
    background-color: darkblue;
    min-width: 300px;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    font-size: 1.5rem;
    border: 1px solid cornflowerblue;
    border-radius: 10px;
    gap: 10px;
     
     a{
        border: 1px solid cornflowerblue;
        border-radius: 10px;
        padding: 0.5rem;
     }`

export default function BalCard({bal}){
    return(
        <StyledBalDiv>
            <h2>{bal.name}</h2>
            <span>Amount: ${bal.balanceAmount}</span>
            <span>Return Date: {bal.returnDate}</span>
            <span>Date of Birth: {bal.dateOfBirth}</span>
            <Link href={`/balDetails/${bal.id}`}>View Details</Link>
        </StyledBalDiv>
    )
}