import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

function DeleteBook() {
  
  const [loading, setLoading]=useState(false)
  const navigate=useNavigate()
  const {id}=useParams()
  const {enqueueSnackbar}=useSnackbar()

  function handleDeleteBook(){
    setLoading(true)
    axios
    .delete(`http://localhost:3000/books/${id}`)
    .then(()=>{
      setLoading(false)
      enqueueSnackbar("Book Deleted successfully", {variant: "success"})

      navigate("/")           //navigating to / when book is deleted
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
      enqueueSnackbar("An error occured", {variant: "error"})
    })
  }


  return (
    <div className='p-4'>
        <BackButton />
        <h1 className="text-3xl my-4">Delete Book</h1>
        {loading? <Spinner/>:""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] mx-auto p-8">
          <h3 className="text-2xl">Are You Sure you want to delete this book?</h3>
          <button className="bg-red-400 text-white m-8 p-4 w-full" onClick={handleDeleteBook}>
            Yes, Delete it
          </button>
        </div>
    </div>
  )
}

export default DeleteBook
