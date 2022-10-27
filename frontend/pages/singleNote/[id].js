import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../Components/Header";
import { DocumentRenderer } from "@keystone-6/document-renderer";

//TODO maybe comments on notes would be useful


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
    }`

export default function SingleNote(){
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
 

    const { data, loading, error } = useQuery(SINGLE_POST_QUERY, {
        variables: {
            id,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    const note = data.post;
    console.log(note.author.name);

    return (
        <div className="singleNotePage">
            <Header />
            <div className="displayNote">
                <h2>{note.title}</h2>
                <p>{note.publishDate} </p>
                <p>By: {note.author.name} </p>
                <DocumentRenderer document={note.content.document} />

            </div>
        </div>
    )
}