import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"

function BookModel({ book, onClose }) {
    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()}
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative">
                <AiOutlineClose className="right-6 top-6 text-3xl absolute text-red-600 cursor-pointer"
                    onClick={onClose} />

                <h2 className="w-fit bg-red-300 py-1 px-4">
                    {book.publishYear}
                </h2>

                <h4 className="text-gray-h4 my-2">{book._id}</h4>
                <div className="flex books-center justify-start gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.title}</h2>
                </div>

                <div className="flex books-center justify-start gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.author}</h2>
                </div>
                <p className="mt-4">Eye catching one liner</p>
                <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolor adipisci atque voluptas asperiores, minus dolores necessitatibus, delectus, molestiae voluptate reprehenderit sunt facere obcaecati recusandae.</p>
            </div>
        </div>
    )
}

export default BookModel