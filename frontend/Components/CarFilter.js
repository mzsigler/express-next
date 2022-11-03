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


    // const { data, loading, error } = useQuery(TEST_QUERY);    
    const[getCars, {loading, error, data }] = useLazyQuery(CAR_QUERY);


    

    function getFormData(e){
        e.preventDefault();
        let inv = (e.target.form[0].value).toUpperCase();
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

            <StyledResults>
            {data && data.cars.map(car => {
                return (
                    <CarCard key={car.id} car={car}/>
                    
                )
            })}

            </StyledResults>

        </div>
    )
}