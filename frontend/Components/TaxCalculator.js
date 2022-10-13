import { useState } from "react";


export default function TaxCalculator(){

    const [purchasePrice, setPurchasePrice] = useState();
    const [localTax, setLocalTax] = useState();
    const [tnTax, setTnTax] = useState();
    const [singleArticle, setSingleArticle] = useState();
    const [totalTax, setTotalTax] = useState();
    const [totalPrice, setTotalPrice] = useState()

    function calculate(e){
        e.preventDefault();
        const price = parseFloat(e.target.form.price.value);
        setPurchasePrice(price);
        const area = (e.target.form.area.value);

        let stateTx = parseInt(purchasePrice) * 0.07;
        stateTx = Math.round( stateTx * 1e2 ) / 1e2
        setTnTax(stateTx);

        if(purchasePrice > 3200){
            const singleArticleTx = 44.00;
            setSingleArticle(singleArticleTx);
        }

        if(purchasePrice < 1600){
            const singleArticleTx = 0.00;
            setSingleArticle(singleArticleTx);
        }

        if(purchasePrice > 1599 && purchasePrice < 3201){
            let singleArticleTx = parseInt(purchasePrice) * 0.0275;
            singleArticleTx = singleArticleTx * 1e2  / 1e2;
            setSingleArticle(singleArticleTx);
        }

        if(area === "unincorporated"){
            if(purchasePrice > 1600){
                const localTx = 36.00;
                setLocalTax(localTx);
            }

            if(purchasePrice < 1601){
                let localTx = parseFloat(purchasePrice) * 0.0225;
                localTx = localTx * 1e2  / 1e2;
                setLocalTax(localTx);
            }
        }

        if(area === 'allOther'){
            if(purchasePrice > 1600){
                const localTx = 44.00;
                setLocalTax(localTx);
            }

            if(purchasePrice < 1601){
                let localTx = parseInt(purchasePrice) * 0.0275;
                localTx = (localTx * 1e2)  / 1e2
                setLocalTax(localTx);
            }
        }


        
        const taxTotal = (localTax + tnTax + singleArticle);
        setTotalTax(taxTotal);
        const total = taxTotal + purchasePrice
        setTotalPrice(total)
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
                <button type="submit" onClick={calculate}>Submit</button>
                

            </form>

            <div className="taxCalcResults">
                <p>TN State Tax: ${tnTax} </p>
                <p>Local Tax: ${localTax} </p>
                <p>Single Article Tax: ${singleArticle} </p>
                <p>Total Tax: ${totalTax} </p>
                <p>Total Price: ${totalPrice}</p>
            </div>

            

        </div>
    )
}