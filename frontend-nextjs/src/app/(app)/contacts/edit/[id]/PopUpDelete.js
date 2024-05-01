import React from 'react'
import CloseIcon from '@/components/icons/CloseIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';


const PopUpDelete = ({ setPopUpDelete, onDelete, id }) => {


  return (
    <div
      className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative" >
        <CloseIcon setPopUpDelete={setPopUpDelete} />
        <div className="my-8 text-center">
          <DeleteIcon />
          <h4 className="text-xl font-semibold mt-6">Are you sure you want to delete this contact?</h4>
        </div>
        <div className="flex flex-col space-y-2">
          <button type="button" onClick={() => onDelete(id)
          }
            className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500">Delete</button>
          <button type="button" onClick={() => setPopUpDelete(false)}
            className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PopUpDelete