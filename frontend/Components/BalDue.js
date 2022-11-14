import { gql } from "@apollo/client"
import { useLazyQuery } from "@apollo/client"
import styled from "styled-components"
import BalCard from "./BalCard"

const StyledBalResults = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
`

const BalDueFormStyled = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 2rem;
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

    const SSN_QUERY = gql`
    query($ssn: String!){
        balances(where: {SSN: {contains: $ssn}}){
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

    const DL_QUERY = gql`
        query($dl: String!){
        balances(where: {driverLicenseNumber: {contains: $dl}}){
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
    const [ssnQuery, {data: ssnData, loading: ssnLoading, error: ssnError}] = useLazyQuery(SSN_QUERY);
    const [dlQuery, {data: dlData, loading: dlLoading, error: dlError}] = useLazyQuery(DL_QUERY);

    function handleForm(e){
        e.preventDefault();
        const searchTerm  = (e.target.form.searchBox.value);
        const searchField = (e.target.form.field.value);

        if(searchField === "name"){
            nameQuery({variables: {name: searchTerm}});
        }

        if(searchField === "ssn"){
            ssnQuery({variables: {ssn: searchTerm}});
        }

        if(searchField === "dl"){
            dlQuery({variables: {dl: searchTerm}});
        }
    }


    return (
        <div className="balDue">
            <BalDueFormStyled>
                <input type="text" name="searchBox" id="searchBox" />
                <select name="field" id="field">
                    <option value="name">Name</option>
                    <option value="ssn">SSN</option>
                    <option value="dl">License Number</option>
                </select>
                <button onClick={handleForm}>Search</button>
            </BalDueFormStyled>
            <StyledBalResults>
                
                {nameData && nameData.balances.map(bal => {
                    return(
                        <BalCard bal={bal} key={bal.id}/>
                    )
                })}

                {ssnData && ssnData.balances.map(bal => {
                    return(
                        <BalCard bal={bal} key={bal.id}/>
                    )
                })}

                {dlData && dlData.balances.map(bal => {
                    return(
                        <BalCard bal={bal} key={bal.id}/>
                    )
                })}


            </StyledBalResults>
        </div>
    )
}