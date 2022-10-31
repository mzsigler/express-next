import { useQuery } from "@apollo/client";
import gql from "@apollo/client";
import styled from "styled-components";

const StyledCarFilterForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 1rem;
`

export default function CarFilter(){
    return (
        <div className="carFilter">
            <StyledCarFilterForm>
                <label>Filter</label>
                <input type="text" name="Inventory" id="inventory" />
                <select name="searchBy" id="searchBy">
                    <option value="inv">Inventory Number</option>
                    <option value="make">Make</option>
                    <option value="model">Model</option>
                    <option value="vin">VIN</option>
                </select>
            </StyledCarFilterForm>
            
        </div>
    )
}