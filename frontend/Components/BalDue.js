import { gql } from "@apollo/client"
import { useLazyQuery } from "@apollo/client"
import styled from "styled-components"
import Link from "next/link"

export default function BalDue(){

    function handleForm(e){
        e.preventDefault();
        const searchTerm  = (e.target.form.searchBox.value);
        const searchField = (e.target.form.field.value);

        if(searchField === "name"){
            console.log("You searched by name.");
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
        </div>
    )
}