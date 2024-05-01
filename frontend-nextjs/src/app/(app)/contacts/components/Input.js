import React from 'react'

const Input = ({ onChange, onBlur, value, errors, touched, id, title }) => {
  return (
    <div><h5 className='font-medium'>{title}</h5>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        type="text"
        className={errors && touched ? " border-2  bg-gray-200 appearance-none  border-red-500 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" : " bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
      />
      {errors && touched && <p className='text-red-500'>{errors}</p>}</div>
  )
}

export default Input