import { useState, useEffect } from "react";


export default function TaxCalculator(){


    const [ results, setResults ] = useState({
        purchasePrice: 0,
        localTax: 0, 
        tnTax: 0,
        singleArticle: 0,
    });


    function clear(){
        setResults({
            purchasePrice: 0, 
            localTax: 0, 
            tnTax: 0, 
            singleArticle: 0,
        })
    }


    function calculate(e){
        e.preventDefault();
        const price = parseInt(e.target.form.price.value);
        const area = (e.target.form.area.value);
        console.log(e.target.form.area.value);

        let stateTx = parseInt(price) * 0.07;
        stateTx = Math.round( stateTx * 1e2  / 1e2 );
        let singleArticleTx;
        let localTx;
   

        if(price > 3200){
            singleArticleTx = 44.00;
            console.log(singleArticleTx)

        }

        if(price < 1600){
            singleArticleTx = 0.00;

        }

        if(price > 1599 && price < 3201){
            singleArticleTx = parseFloat(price) * 0.0275;
            singleArticleTx = (singleArticleTx * 1e2  / 1e2);


        }


        if(area === "allOther"){
            if(price >= 1600){
                localTx = 44.00;
            }
                
    
            if(price < 1599){
                localTx = parseFloat(price) * 0.0275;
                localTx = (localTx * 1e2)  / 1e2;
            }
        }

        if(area === "unincorporated"){
            if(price >= 1600){
                localTx = 44.00;
            }
                
    
            if(price < 1599){
                localTx = parseFloat(price) * 0.0225;
                localTx = (localTx * 1e2)  / 1e2;
            }
        }

        setResults({...results, 
            purchasePrice: price, 
            localTax: localTx, 
            tnTax: stateTx, 
            singleArticle: singleArticleTx,});


    };





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
                <p>Total Tax: ${(results.singleArticle + results.localTax + results.tnTax).toFixed(2)} </p>
                <p>Total Price: ${(results.purchasePrice + results.singleArticle + results.localTax + results.tnTax).toFixed(2)}</p>
            </div>

            

            

        </div>
    )
}