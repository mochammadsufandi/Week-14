import { getAllBook } from "@/fetching/books";


export default async function Book() {
    const fetchedBook = await getAllBook();

    return (
        <>
           {JSON.stringify(fetchedBook)}
        </>
    )
}


