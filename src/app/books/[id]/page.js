"use client"

import Navbar from "@/app/components/Navbar";
import { deleteBook, getAllBook, getBookById, updateBook } from "@/fetching/books"
import { useEffect,useState } from "react"
import { Skeleton, Stack, Spinner, useToast } from '@chakra-ui/react'
import Modal from "@/app/components/Modal";
import BookForm from "@/app/components/BookForm";
import { useRouter } from "next/navigation";


export default function DetailBook ({params}) {

    const[book,setBook] = useState({});
    const[loading,setLoading] = useState(false);
    const[isOpenEdit, setIsOpenEdit] = useState(false);
    const[isOpenDelete, setIsOpenDelete] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const fetchData = async () => {

        const response = await getBookById(params.id);
        const books = await getAllBook();
        setBook(response.data);
        setLoading(false)

    }

    useEffect(() => {
        const fetching = async () => {
            setLoading(true)
            await fetchData()
        }
        fetching()
    }, [isOpenEdit])

    const openModalEdit = () => {
        setIsOpenEdit(true);
    }

    const openModalDelete = () => {
        setIsOpenDelete(true);
    }

    const closeModalEdit = () => {
        setIsOpenEdit(false);
    }

    const closeModalDelete = () => {
        setIsOpenDelete(false);
    }

    const editHandler = async(data) => {
        try {
            const {id} = params
            const response = await updateBook({id,...data});
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
            setIsOpenEdit(false);

        } catch (err) {
            console.log(err);
        }
    }

    const deleteHandler = async() => {
        try {
            const response = await deleteBook(params);
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
            setIsOpenDelete(false);
            router.push('/');

        } catch (err) {
            console.log(err);
        }
    }

    if(loading) {
        return (
            <main style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                <h1>LOADING...</h1>
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                />
            </main>
        )
    } else {
        return (
           <main className="w-full flex justify-center flex-wrap">  
                <Navbar params={params}/>
                <div style={{margin:'8rem 0', padding:'3rem', width:'35rem'}} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div href="/" className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" style={{padding:'2rem'}}>
                        <img src={book.image} alt="" className="w-100"/>
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.author}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.publisher}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${book.year} | ${book.pages} Pages`}</p>
                        <div style={{textAlign:'center', padding:'1rem'}}>
                            <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                onClick={openModalEdit}
                            >
                                Edit
                            </button>
                            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={openModalDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <Modal isOpen={isOpenEdit} onClose={closeModalEdit} className={"max-w-lg"}>
                     <BookForm data={book} submitHandler={editHandler}/>
                </Modal>

                <Modal isOpen={isOpenDelete} onClose={closeModalDelete} className={"max-w-md"}>
                    <h1>Are you sure to Delete this Book ?</h1>
                    <div className="mt-5">
                        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={deleteHandler}
                        >
                            Yes
                        </button>
                        <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={closeModalDelete}
                        >
                            No
                        </button>
                    </div>
                </Modal>

           </main>
    
        )
    }
    
}