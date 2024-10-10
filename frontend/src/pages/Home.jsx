import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import axios from 'axios'
import BooksTable from "../components/home/BooksTable"
import BooksCards from '../components/home/BooksCards'
import { MdOutlineAddBox } from 'react-icons/md'

function Home() {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState("table")

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/books")
            .then((response) => {
                setBooks(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        <div className='p-4'>

            <div className="flex justify-center items-center gap-x-4 mx-auto">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    onClick={() => setShowType('table')} >
                        Table
                </button>

                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    onClick={() => setShowType('card')} >
                        Card
                </button>
            </div>



            <div className="flex justify-between items-center">
                <h1 className="text-3xl m-8"></h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>

            <h1 className='text-3xl '>Books List</h1>
            {loading ? (
                <Spinner />
            ) : showType === "table" ? (
                <BooksTable books={books} />
            ) : (<BooksCards books={books} />) }

        </div>
    )
}

export default Home
