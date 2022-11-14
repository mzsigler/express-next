import Link from "next/link"
import styled from "styled-components";

const StyledNote = styled.div`
    border: 1px solid cornflowerblue;
    background-color: darkblue;
    padding: 1rem;
    border-radius: 10px;
    a {
        border: 1px solid cornflowerblue;
        border-radius: 10px;
        padding: 7px;
    }
    a:hover {
        background-color: white;
        color: darkblue;
    }
    `



export default function Note({ note }){
    return (
        <StyledNote>
            <h2>{note.title}</h2>
            <h4> By: {note.author.name}</h4>
            <h4> Posted on: {note.publishDate}</h4>
            <Link classname="viewNote" href={`/singleNote/${note.id}`}>View</Link>
        </StyledNote>
    )
}