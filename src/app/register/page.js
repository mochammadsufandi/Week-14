"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import Navbar from "../components/Navbar";
import { registerUser } from "@/fetching/users";
import { useToast } from "@chakra-ui/react";

export default function RegisterUser() {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const toast = useToast();
    const router = useRouter();

    const registerHandler = async(ev) => {
        ev.preventDefault();
        const response = await registerUser({name,email,password});
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
            router.push('/');
        }
    }

    return (
        <main className="flex flex-wrap justify-center">
            <Navbar params={''}/>
            <div style={{margin:'5rem 0', padding:'3rem',width:'40rem'}} className="hover:bg-gray-100 dark:border-teal-900 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-lg">
                <form className="max-w-sm mx-auto" onSubmit={(ev) => {registerHandler(ev)}}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required 
                        onChange={(ev) => {setName(ev.target.value)}}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required 
                        onChange={(ev) => {setEmail(ev.target.value)}}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                            onChange={(ev) => {setPassword(ev.target.value)}}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type="password" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                            onChange={(ev) => {setConfirmPassword(ev.target.value)}}
                         />
                    </div>
                    {password !== confirmPassword && (
                        <div className="mb-5">
                          <span style={{fontSize:'12px', color:'red'}}>The password does not match</span>
                      </div>
                    )}
                  
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
                        Register
                    </button>
                </form>
            </div>
        </main>
    )
}