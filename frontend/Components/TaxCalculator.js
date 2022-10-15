import { useState } from "react";


export default function TaxCalculator(){

    const [purchasePrice, setPurchasePrice] = useState(0);
    const [localTax, setLocalTax] = useState(0);
    const [tnTax, setTnTax] = useState(0);
    const [singleArticle, setSingleArticle] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)

    const [ results, setResults ] = useState({
        purchasePrice: 0, 
        localTax: 0, 
        tnTax: 0, 
        singleArticle: 0,
        totalTax: 0, 
        totalPrice: 0,
    })


    function clear(){
        setPurchasePrice(0);
        setLocalTax(0);
        setTnTax(0);
        setSingleArticle(0);
        setTotalTax(0);
        setTotalPrice(0);
    }


    function calculate(e){
        e.preventDefault();
        const price = parseInt(e.target.form.price.value);
        setResults({...results, purchasePrice: price});
        const area = (e.target.form.area.value);

        let stateTx = parseInt(price) * 0.07;
        stateTx = Math.round( stateTx * 1e2  / 1e2 );
        setResults({...results, tnTax: stateTx});

        if(price > 3200){
            const singleArticleTx = 44.00;
            setResults({...results, singleArticle: singleArticleTx});
        }

        if(price < 1600){
            const singleArticleTx = 0.00;
            setResults({...results, singleArticle: singleArticleTx});
        }

        if(price > 1599 && price < 3201){
            let singleArticleTx = parseInt(purchasePrice) * 0.0275;
            singleArticleTx = singleArticleTx * 1e2  / 1e2;
            setResults({...results, singleArticle: singleArticleTx});
        }

        if(area === "unincorporated"){
            if(price > 1600){
                const localTx = 36.00;
                setLocalTax(localTx);
            }

            if(price < 1601){
                let localTx = parseFloat(purchasePrice) * 0.0225;
                localTx = localTx * 1e2  / 1e2;
                setLocalTax(localTx);
            }
        }

        if(area === 'allOther'){
            if(price > 1600){
                const localTx = 44.00;
                setLocalTax(localTx);
            }

            if(price < 1601){
                let localTx = parseFloat(purchasePrice) * 0.0275;
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
                <button onClick={clear}>Clear</button>
                

            </form>

            <div className="taxCalcResults">
                <p>TN State Tax: ${results.tnTax} </p>
                <p>Local Tax: ${results.localTax} </p>
                <p>Single Article Tax: ${results.singleArticle} </p>
                <p>Total Tax: ${results.totalTax} </p>
                <p>Total Price: ${results.totalPrice}</p>
            </div>

            

            

        </div>
    )
}