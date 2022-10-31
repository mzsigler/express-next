import Header from "../Components/Header";
import { useQuery } from "@apollo/client";
import gql from "@apollo/client";
import CarFilter from "../Components/CarFilter";


export default function cars() {


    return (
    <div>
        <Header />
        
        <CarFilter />

    </div>
    )
}