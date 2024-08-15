"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import Navbar from "@/app/components/Navbar";
import { registerUser } from "@/fetching/users";
import { useToast } from "@chakra-ui/react";
import { addBook } from "@/fetching/books";

export default function CreateBook() {
    const [title,setTitle] = useState();
    const [author,setAuthor] = useState();
    const [publisher,setPublisher] = useState();
    const [year, setYear] = useState();
    const [pages, setPages] = useState();
    const [image, setImage] = useState();
    const toast = useToast();
    const router = useRouter();

    const createHandler = async(ev) => {
        ev.preventDefault();
        const params = {title,author,publisher,year,pages,image};
        const response = await addBook(params);
        const message = await response.json();

        if(message.error) {
            toast({
                title: "Error",
                description: message.error,
                status: "error",
                duration : 1500,
                isClosable : true
            });
        } else {
            toast({
                title: "Success",
                description: message.message,
                status: "success",
                duration : 1500,
                isClosable : true
            });
        }
    }

    return (
        <main className="flex flex-wrap justify-center">
            <Navbar params={''}/>
            <div style={{margin:'5rem 0', padding:'3rem',width:'40rem'}} className="hover:bg-gray-100 dark:border-teal-900 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-lg">
                <form className="max-w-sm mx-auto" onSubmit={(ev) => {createHandler(ev)}}>
                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Quantum Physics" 
                            required 
                            onChange={(ev) => {setTitle(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <input type="text" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Prof Dr. Sufandi, M.Eng" 
                            required 
                            onChange={(ev) => {setAuthor(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="publisher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publisher</label>
                        <input type="text" id="publisher" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Wiley & Sons Inc" 
                            required 
                            onChange={(ev) => {setPublisher(ev.target.value)}}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                        <input type="number" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2024" required min={1900}
                        onChange={(ev) => {setYear(ev.target.value)}}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="pages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pages</label>
                        <input type="number" id="pages" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="121" required min={1}
                        onChange={(ev) => {setPages(ev.target.value)}}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <input type="file" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="image"
                        onChange={(ev) => {setImage(ev.target.files[0])}}/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
                           Add Book
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
