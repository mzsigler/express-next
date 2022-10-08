import { DocumentRenderer } from "@keystone-6/document-renderer"
import Link from "next/link"

//TODO make each note show just the title, author, and date, and click it to take you to the content


export default function Note({ note }){
    return (
        <div className="note">
            <h2>{note.title}</h2>
            <h4> By: {note.author.name}</h4>
            <h4> Posted on: {note.publishDate}</h4>
            <Link href="/notes/{note.id}">View</Link>
        </div>
    )
}