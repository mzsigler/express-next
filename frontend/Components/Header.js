import Link from "next/link";
import { CURRENT_USER_QUERY, useUser } from "./User";
import LogIn from "./LogIn";
import { useQuery } from "@apollo/client";

export default function Header(){
    const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
    {data && console.log(data)};
    {error && console.log(error)};
    {loading && console.log(loading)};

    return(
        
        <div className="header">
            <h2>ECR APPS</h2>
            { <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/taxCalculator">
                        <a>Tax Calculator</a>
                    </Link>
                </li>
                <li>
                    <Link href="/balDue">
                        <a>Balance Due</a>
                    </Link>
                </li>
                <li>
                    <Link href="/cars">
                        <a>Cars</a>
                    </Link>
                </li>
                <li>
                    <LogIn />
                </li>
            </ul>}
            
        </div>
    )
}