import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../Components/Header";
import gql from "@apollo/client";

export default function SingleNote(){
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const SINGLE_POST_QUERY = gql`
    query($id: ID!){
  post(where: { id: $id}){
    title
    publishDate
    author {
      name
    }
    content {
      document
    }
  }
}
 `


    return (
        <div className="singleNote">
            <Header />
            <p>Hey I am a single note. </p>
        </div>
    )
}