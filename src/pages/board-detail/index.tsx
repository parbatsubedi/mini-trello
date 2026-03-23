import { useParams } from 'react-router-dom'

export default function BoardDetailPage() {
    // useParams reads the :boardId segment from the URL.
    const { boardId } = useParams<{ boardId: string }>()

    return (
        <div>
            <h1>Board {boardId}</h1>
            <p>Cards, columns, drag-and-drop go here.</p>
        </div>
    )
}