import Link from "next/link";
import { useUser } from "./User";
import LogIn from "./LogIn";

export default function Header(){
    const user = useUser();

    console.log(user);
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
            </ul>}
            
        </div>
    )
}