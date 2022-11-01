import { useQuery, gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { useState } from "react";
import CarCard from "./CarCard";

const StyledCarFilterForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 1rem;
`

export default function CarFilter(){

    let cars;
    const [searchField, setSearchField] = useState();
    const [searchTerm, setsearchTerm] = useState();

    const TEST_QUERY = gql`
    query{
        cars {
            year, 
            make, 
            model,
            vin
        }
    }`

    const [
        getCars, 
        {loading, data}
    ] = useLazyQuery(TEST_QUERY)
    

    

    function getFormData(e){
        e.preventDefault();
        let formField = (e.target.form[1].value).toLowerCase();
        let formTerm = (e.target.form[0].value).toLowerCase();
        setSearchField(formField);
        setsearchTerm(formTerm);

    }

    return (
        <div className="carFilter">
            <StyledCarFilterForm>
                <label>Filter</label>
                <input type="text" name="searchText" id="searchText" />
                <select name="searchBy" id="searchBy">
                    <option value="inv">Inventory Number</option>
                    <option value="make">Make</option>
                    <option value="model">Model</option>
                </select>
                <button onClick={() => getCars()}>Go</button>
                {data && data.cars.map(car => console.log(car))}
            </StyledCarFilterForm>


        </div>
    )
}