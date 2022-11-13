import Header from "../../Components/Header";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import gql from "@apollo/client";

export default function BalDetails(){

    const router = useRouter();
    const { id } = router.query;



    return (
        <div>
            <Header />

            Hey I am details for balance id {id}.
        </div>
    )
}