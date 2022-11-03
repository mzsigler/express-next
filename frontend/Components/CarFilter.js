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

    const [searchField, setSearchField] = useState();
    const [searchTerm, setsearchTerm] = useState();

    const CAR_QUERY = gql`
    query(
        $inv: String,
    ){
        cars(where: {inv: {equals: "A04"}} ){
            year,
            make,
            model,
            year,
            vin,
            inv,
        }
    }`

    const TEST_QUERY = gql`
    query{
        cars {
            year, 
            make, 
            model,
            vin,
            inv
        }
    }`

    // const { data, loading, error } = useQuery(TEST_QUERY);    
    const[getCars, {loading, error, data }] = useLazyQuery(TEST_QUERY);


    

    function getFormData(e){
        e.preventDefault();
        let formField = (e.target.form[1].value).toLowerCase();
        let formTerm = (e.target.form[0].value).toLowerCase();
        setSearchField(formField);
        setsearchTerm(formTerm);
        getCars();

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
                <button onClick={getFormData}>Go</button>
                
            </StyledCarFilterForm>

            <div className="results">
            {data && data.cars.map(car => {
                return <p key={car.id}>{car.make} {car.model} {car.inv}</p>
            })}

            {console.log(data, loading)}
            </div>

        </div>
    )
}