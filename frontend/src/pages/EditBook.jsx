import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

function EditBook() {
  
  const [title, setTitle]=useState("")
  const [author, setAuthor]=useState("")
  const [publishYear, setPublishYear]=useState("")
  const [loading, setLoading]=useState(false)
  const navigate=useNavigate()
  const {id}=useParams()
  const {enqueueSnackbar}=useSnackbar()

  //function to edit the book
  const handleEditBook=()=>{
    const data={
      title,
      author,
      publishYear
    }
    setLoading(true)

    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(()=>{
        setLoading(false)
        enqueueSnackbar("Book Updated successfully", {variant: "success"})
        navigate("/")           //navigating to / when data has been saved to the database
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
        enqueueSnackbar("An error occured", {variant: "error"})
      })
  }

  //Showing the current book information
  useEffect(()=>{
    setLoading(true)
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then(res=>{
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
        setTitle(res.data.title)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
        alert("An error occured!!!")
      })

  }, [])

  return (
    <div className='p-4'>
        <BackButton />
        <h1 className="text-3xl my-4 text-center">Edit Book</h1>
        {
          loading ? <Spinner /> :""
        }

        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl text-gray-500">Title</label>
            <input type='text' name='title' value={title} onChange={(e)=> setTitle(e.target.value)} className='w-full px-4 border-2 border-gray-500 py-2'/>
          </div>

          <div className="my-4">
            <label className="text-xl text-gray-500">Author</label>
            <input type='text' name='author' value={author} onChange={(e)=> setAuthor(e.target.value)} className='w-full px-4 border-2 border-gray-500 py-2'/>
          </div>

          <div className="my-4">
            <label className="text-xl text-gray-500">Publish Year</label>
            <input type='number' name='publishYear' value={publishYear} onChange={(e)=> setPublishYear(e.target.value)} className='w-full px-4 border-2 border-gray-500 py-2'/>
          </div>

          <button className="p-2 bg-sky-300 m-8 " onClick={handleEditBook}>
             Save
          </button>

        </div>
    </div>
  )
}

export default EditBook
