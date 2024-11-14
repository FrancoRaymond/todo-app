import React from 'react'
import { useAppContext } from '../App'

const Form = () => {
    const {handleSubmit, setItem, item} = useAppContext()
  return (
    <form action="" className="flex flex-col my-3" onSubmit={handleSubmit}>
        <label htmlFor="item" className="text-white text-2xl font-semibold">
          New item
        </label>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          type="text"
          name="item"
          id="item"
          autoComplete="off"
          placeholder="Add task/item"
          className="bg-orange-500 mt-4 px-4 py-1 rounded-md border-0 outline-none text-white placeholder-gray-300"
        />
        <button
          type="submit"
          className="border rounded-md mt-4 w-5/6 mx-auto px-4 py-1 text-white bg-orange-500 bg-opacity-30 border-orange-500 active:scale-105 transition duration-100 active:font-semibold"
        >
          Add
        </button>
    </form>
  )
}

export default Form
