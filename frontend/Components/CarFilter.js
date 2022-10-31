import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const StyledCarFilterForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 1rem;
`

export default function CarFilter(){

    let cars;
    let searchField;
    let searchTerm;

    const TEST_QUERY = gql`
    query{
        cars {
            year,
            make,
            model,
        }
    }`

    const { data, loading, error } = useQuery(TEST_QUERY);


    function getFormData(e){
        e.preventDefault();
        searchField = (e.target.form[1].value).toLowerCase();
        searchTerm = (e.target.form[0].value).toLowerCase();


        console.log(data);

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

        {cars && <p>Hello there are cars</p>}

        </div>
    )
}