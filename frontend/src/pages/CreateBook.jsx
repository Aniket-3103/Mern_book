import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack' 

function CreateBook() {
  
  const [title, setTitle]=useState("")
  const [author, setAuthor]=useState("")
  const [publishYear, setPublishYear]=useState("")
  const [loading, setLoading]=useState(false)
  const navigate=useNavigate()
  const {enqueueSnackbar}=useSnackbar()

  //function to save data to the database
  const handleSaveBook=()=>{
    const data={
      title,
      author,
      publishYear
    }
    setLoading(true)

    axios
      .post('http://localhost:3000/books', data)
      .then(()=>{
        setLoading(false)
        enqueueSnackbar("Book Created successfully", {variant: "success"})
        navigate("/")           //navigating to / when data has been saved to the database
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
        enqueueSnackbar("An error occured", {variant: 'error'})
      })
  }


  return (
    <div className='p-4'>
        <BackButton />
        <h1 className="text-3xl my-4 text-center">Create Book</h1>
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

          <button className="p-2 bg-sky-300 m-8 " onClick={handleSaveBook}>
             Save
          </button>

        </div>
    </div>
  )
}

export default CreateBook
