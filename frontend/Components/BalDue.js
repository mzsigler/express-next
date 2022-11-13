import { gql } from "@apollo/client"
import { useLazyQuery } from "@apollo/client"
import styled from "styled-components"
import Link from "next/link"
import BalCard from "./BalCard"

const StyledBalResults = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
`



export default function BalDue(){

    const NAME_QUERY = gql`
    query($name: String!){
        balances(where: {name: {contains: $name}}){
            name,
            id,
            balanceAmount,
            SSN,
            dateOfBirth,
            returnDate,
            payment{
                paymentAmount,
                date
            }
        }
    }
`
    const [nameQuery, {data: nameData, loading: nameLoading, error: nameError }] = useLazyQuery(NAME_QUERY);

    function handleForm(e){
        e.preventDefault();
        const searchTerm  = (e.target.form.searchBox.value);
        const searchField = (e.target.form.field.value);

        if(searchField === "name"){
            nameQuery({variables: {name: searchTerm}});
            console.log(nameData);
        }

        if(searchField === "ssn"){
            console.log("You searched by SSN.");
        }

        if(searchField === "dl"){
            console.log("You searched by Driver's License number");
        }
    }


    return (
        <div className="balDue">
            <form>
                <input type="text" name="searchBox" id="searchBox" />
                <select name="field" id="field">
                    <option value="name">Name</option>
                    <option value="ssn">SSN</option>
                    <option value="dl">License Number</option>
                </select>
                <button onClick={handleForm}>Search</button>
            </form>
            <StyledBalResults>
                {nameData && nameData.balances.map(bal => {
                    return(
                        <BalCard bal={bal} key={bal.id}/>
                    )
                })}
            </StyledBalResults>
        </div>
    )
}