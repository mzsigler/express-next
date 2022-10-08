import { DocumentRenderer } from "@keystone-6/document-renderer"


export default function Note({ note }){
    return (
        <div className="note">
            <h2>{note.title}</h2>
            <h4> By: {note.author.name}</h4>
            <DocumentRenderer document={note.content.document} />
        </div>
    )
}