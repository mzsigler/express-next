import { useQuery, gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import CarCard from "./CarCard";

const StyledCarFilterForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 1rem;
`
const StyledResults = styled.div`
display: grid;
grid-template-columns: 1fr;
min-width: 90vw;
justify-items: center;
`



export default function CarFilter(){


    const INV_QUERY = gql`
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

    const VIN_QUERY = gql`
    query(
        $vin: String,
    ){
        cars(where: {vin: {contains: $vin}}){
            year,
            make,
            model,
            year,
            vin,
            inv,
            id
        }
    }`


    const[invSearch, {loading, error, data }] = useLazyQuery(INV_QUERY);
    const[vinSearch, {data: vinData}] = useLazyQuery(VIN_QUERY);


    function getFormData(e){
        e.preventDefault();
        let inv = (e.target.form[0].value).toUpperCase();
        let searchBy = (e.target.form[1].value);

        if(searchBy === 'inv'){
            invSearch({ variables: {inv}})
        }

        if(searchBy === 'vin'){
            let vin = (e.target.form[0].value);
            vinSearch({ variables: {vin}})
        }
    

    }

    return (
        <div className="carFilter">
            <StyledCarFilterForm>
                <input type="text" name="searchText" id="searchText" />
                <select name="searchType" id="searchType">
                    <option value="inv">Inventory Number</option>
                    <option value="vin">VIN</option>
                </select>
                <button onClick={getFormData}>Go</button>
                
            </StyledCarFilterForm>

            <div className="results">

            <StyledResults>
            {data && data.cars.map(car => {
                return (
                    <CarCard key={car.id} car={car}/>
                    
                )
            })}

            {vinData && vinData.cars.map(car => {
                return (
                    <CarCard key={car.id} car={car}/>
                    
                )
            })}

            

            </StyledResults>
            </div>

        </div>
    )
}