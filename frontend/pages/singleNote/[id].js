import { useRouter } from "next/router";
import Header from "../../Components/Header";

export default function SingleNote(){
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    return (
        <div className="singleNote">
            <Header />
            <p>Hey I am a single note. </p>
        </div>
    )
}