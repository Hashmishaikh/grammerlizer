import React from 'react'
import DropDown from './DropDown'

const TopHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="ml-6 flex space-x-4">
                {/* <a
                  href="#"
                  className="inline-flex items-center px-2 pt-1 border-b-2 border-orange-600 text-sm font-medium text-gray-900"
                >
                  Document
                </a> */}
                {/* <a
                  href="#"
                  className="inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  History
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Templates
                </a> */}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Save
              </button>
              {/* <button className="bg-white text-gray-700 px-4 py-2 rounded text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Export
              </button> */}
              {/* <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button> */}
              {/* <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
                <svg
                  className="ml-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button> */}
              <DropDown />
            </div>
          </div>
        </div>
      </header>
  )
}

export default TopHeader