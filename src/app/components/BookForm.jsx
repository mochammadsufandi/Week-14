import { useState } from "react"

const BookForm = ({submitHandler, data}) => {
    const[title, setTitle] = useState(data.title);
    const[author, setAuthor] = useState(data.author);
    const[publisher, setPublisher] = useState(data.publisher);
    const[year, setYear] = useState(data.year);
    const[pages, setPages] = useState(data.pages);
    const[image, setImage] = useState();

    return (
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            <div style={{margin:'1rem 0', padding:'2rem 1rem', width:'40rem'}} className="hover:bg-gray-100 dark:border-teal-900 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-lg">
                <form className="max-w-sm mx-auto" 
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        submitHandler({title,author,publisher,year,pages,image});
                    }}
                >   
                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Quantum Physics" 
                            required 
                            defaultValue={data.title}
                            onChange={(ev) => {setTitle(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <input type="text" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Prof Dr Sufandi M.Eng" 
                            required 
                            defaultValue={data.author}
                            onChange={(ev) => {setAuthor(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="publisher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publisher</label>
                        <input type="text" id="publisher" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-P00" 
                            placeholder="Wiley & Sons Inc" 
                            required
                            defaultValue={data.publisher}
                            onChange={(ev) => {setPublisher(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                        <input type="text" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="2023" 
                            required
                            defaultValue={data.year}
                            onChange={(ev) => {setYear(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="pages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pages</label>
                        <input type="text" id="pages" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="459" 
                            required
                            defaultValue={data.pages}
                            onChange={(ev) => {setPages(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <div className="flex flex-wrap">
                            <img src={data.image} alt="" className="w-1/4 m-2 rounded-lg"/>
                            <input type="file" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="image"
                                onChange={(ev) => {setImage(ev.target.files[0])}}
                            />
                        </div>
                    </div>

                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
                        Edit Book
                    </button>

                </form>
            </div>
        </div>
    )
}

export default BookForm;