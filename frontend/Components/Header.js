import Link from "next/link";

export default function Header(){
    return(
        <div className="header">
            <h2>ECR APPS</h2>
            <ul>
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
                    <Link href="/notes">
                        <a>Notes</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}