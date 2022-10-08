import { useState } from "react";


export default function TaxCalculator(){

    const [price, setPrice] = useState(0)

    function calculate(e){
        e.preventDefault();
        const purchasePrice = (e.target.form.price.value);
        setPrice(purchasePrice);
        console.log(e.target.form.area.value);
    }

    return(
        <div className="taxCalculator">

            <form name="taxCalcForm" className="taxCalcForm">
                <label htmlFor="price">Purchase Price</label>
                <input type="number" name="price" id="price"/>
                <label htmlFor="area">Select an Area</label>
                <select name="area" id="area">
                    <option value="allOther">All Other</option>
                    <option value="unincorporated">Unincorporated Shelby County</option>
                </select>
                <button onClick={calculate}>Submit</button>
                

            </form>

            <div className="taxCalcResults">Price: {price} </div>

            

        </div>
    )
}