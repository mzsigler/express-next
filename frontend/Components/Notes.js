import { gql, useQuery } from "@apollo/client"
import client from "../helpers/apollo-client"
import { DocumentRenderer } from "@keystone-6/document-renderer";

export const ALL_POSTS_QUERY = gql`
query{
  posts{
    id,
    publishDate,
    content{
      document
    }
  }
}`

export default function Notes(){
    const { data, error, loading } = useQuery(ALL_POSTS_QUERY);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message} </p>
    const date = (data.posts[0].publishDate);
    const post = (data.posts[0].content.document);

    return (
        <div className="notes">
        <h2>I am the notes page.</h2>
        <h3>{date}</h3>
        <DocumentRenderer document={post} />
        </div>
    )
}