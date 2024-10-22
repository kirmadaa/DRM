import React from 'react'
import { Link } from 'react-router-dom'
import { getTitle } from '../utility/serviceMethod'

function ModuleNotFound(props) {
  const { moduleName } = props
  return (
    <div className="p-2 w-full min-h-[70dvh] flex justify-center flex-col items-center">
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{getTitle(moduleName)} Form</h3>
      <p className='font-normal text-gray-700'>If you need {getTitle(moduleName)} form, please create a new module for {getTitle(moduleName)} form</p>
      <Link to={`/crm/createModule?name=${moduleName}`} type="button" className="text-white mt-4 bg-primary hover:bg-priamry/20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none " >
        Create New module</Link>
    </div>
  )
}

export default ModuleNotFound
