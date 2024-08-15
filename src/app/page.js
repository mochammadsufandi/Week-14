"use client"

import prisma from "@/lib/prisma";
import TableBook from "./components/TableBooks";
import Navbar from "./components/Navbar";
import { getAllBook } from "@/fetching/books";
import URL from "@/lib/apiURL";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function Home() {
  const [books,setBooks] = useState([]);

  async function fetchBook() {
    try {
      const response = await getAllBook()
      const sortedBooks = response.data;

      for(let i = 0; i<sortedBooks.length-1; i++) {
        for(let j = i+1; j<sortedBooks.length; j++) {
          if(sortedBooks[i].id > sortedBooks[j].id ) {
            const x = sortedBooks[i];
            sortedBooks[i] = sortedBooks[j];
            sortedBooks[j] = x;
          }
        }
      }

      setBooks(sortedBooks);
      
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [])

    return (
      <main>
        <Navbar params={''}/>
        <TableBook books={books}/>
      </main>
    );
}
