import { useQuery, gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import CarCard from "./CarCard";

const StyledCarFilterForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 1rem;
`

export default function CarFilter(){


    const CAR_QUERY = gql`
    query(
        $inv: String,
    ){
        cars(where: {inv: {equals: $inv}} ){
            year,
            make,
            model,
            year,
            vin,
            inv,
            id
        }
    }`

    const TEST_QUERY = gql`
    query{
        cars {
            year, 
            make, 
            model,
            vin,
            inv, 
            id,
        }
    }`

    // const { data, loading, error } = useQuery(TEST_QUERY);    
    const[getCars, {loading, error, data }] = useLazyQuery(CAR_QUERY);


    

    function getFormData(e){
        e.preventDefault();
        let inv = (e.target.form[0].value).toLowerCase();
        getCars({ variables: {inv}});
        console.log(data, loading)

    }

    return (
        <div className="carFilter">
            <StyledCarFilterForm>
                <label>Inventory Number</label>
                <input type="text" name="searchText" id="searchText" />
                <button onClick={getFormData}>Go</button>
                
            </StyledCarFilterForm>

            <div className="results">
            {data && data.cars.map(car => {
                return <p key={car.id}> {car.make} {car.model} {car.inv} <button>Click Me</button></p>
            })}

            </div>

        </div>
    )
}