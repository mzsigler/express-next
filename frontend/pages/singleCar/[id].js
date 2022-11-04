import { useQuery, gql } from "@apollo/client";
import { concatAST } from "graphql";
import { useRouter } from "next/router";
import CarCard from "../../Components/CarCard";
import Header from "../../Components/Header";

const SINGLE_CAR_QUERY = gql`
    query($id: ID!){
        car(where: {id: $id}){
            id, 
            year, 
            make, 
            model,
            vin,
            inv,
        }
    }
`



export default function SingleCar(){

    const router = useRouter();
    const { id } = router.query;

    const {error, loading, data} = useQuery(SINGLE_CAR_QUERY, {
        variables: {
            id
        }
    });

    console.log(data)


    return(
        <div>
            <Header />
        <div className="singleCar">
        
        </div>
        </div>
    )
}