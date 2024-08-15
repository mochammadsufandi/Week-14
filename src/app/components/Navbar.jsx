"use client"

import { getUserByEmail } from "@/fetching/users";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {FaPlus} from "react-icons/fa6";
import { useUser } from "../context/userContext";

const Navbar = ({params}) => {
    const {user, logout} = useUser();
    const router = useRouter();
    const pathName = usePathname();
    const {id} = params;
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        setIsSignedIn(!!user);
    }, [user])

    // path which the addBook button appear
    const pathWithAddButton = ['/', `/books/${id}`];

    const handleClick = async() => {
        router.push('/books/create');
    }

    const logoutHandler = async() => {
        logout();
        router.push('/login');
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900" style={{width:'100%'}}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://file.qijisoft.com/Valofe_file/web/vfun/images/logo/logo-vfun.png" className="h-8" alt="Flowbite Logo" />
                </a>
                <div>
                    {isSignedIn && pathWithAddButton.includes(pathName) && (
                        <button className="flex gap-2 items-center justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => {handleClick()}}
                        >
                            <FaPlus />
                            Add Book
                        </button>
                    )}
                </div>
                { isSignedIn && typeof(user) !== 'object' && (
                   <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => {
                        logoutHandler();
                        console.log(user)
                    }}>
                        Logout
                   </button>
                )}
                { !user &&  (
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <a href="/login">
                            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Sign In
                            </button>   
                        </a>
                        <a href="/register">
                            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Sign Up
                            </button>
                        </a>
                    </div>
                )}
               
            </div>
        </nav>

    )
}

export default Navbar;