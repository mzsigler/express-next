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
                    <Link href="/page2">
                        <a>Maintenance</a>
                    </Link>
                </li>
                <li>Balance Due</li>
                <li>Notes</li>
            </ul>
        </div>
    )
}