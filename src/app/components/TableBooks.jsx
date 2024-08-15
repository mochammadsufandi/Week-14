const TableBook = ({books}) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:lg" style={{marginTop:'2rem'}}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3" style={{textAlign:'center'}}>Title</th>
                        <th scope="col" className="px-6 py-3" style={{textAlign:'center'}}>Author</th>
                        <th scope="col" className="px-6 py-3" style={{textAlign:'center'}}>Year</th>
                        <th scope="col" className="px-6 py-3" style={{textAlign:'center'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => {
                    return (
                        <tr key={book.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{textAlign:'center'}}>{book.title}</th>
                            <td className="px-6 py-4" style={{textAlign:'center'}}>{book.author}</td>
                            <td className="px-6 py-4" style={{textAlign:'center'}}>{book.year}</td>
                            <td className="px-6 py-4" style={{textAlign:'center'}}>
                                <a href={`/books/${book.id}`}>
                                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    Detail
                                </button>
                                </a>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableBook;