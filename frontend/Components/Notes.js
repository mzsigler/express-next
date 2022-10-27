import { gql, useQuery } from "@apollo/client"
import Note from "./Note";
import styled from "styled-components";

//TODO pagination so it doesn't get out of control when there are many notes

const NotesDivStyles = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 60px;
justify-items: center;
`

export const ALL_POSTS_QUERY = gql`
query{
  posts{
    id,
    publishDate,
    title,
    author{
        name
    }
    content{
      document
    }
  }
}`

export default function Notes(){
    const { data, error, loading } = useQuery(ALL_POSTS_QUERY);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message} </p>
    const notes = data.posts;


    return (
        <NotesDivStyles>
        {console.log(notes)}
        {notes.map((note) => {
             return(
                    <Note key={note.id} note={note}/>
                
             )
        })}
        
        </NotesDivStyles>
    )
}