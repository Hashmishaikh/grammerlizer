import React from 'react';
import '../styles.css';

const Translate = () => {
  return (
    <main className="flex-1 overflow-y-auto p-8">
  <div className="max-w-7xl mx-auto">
    <div className="mb-12">
      <h1 className="text-5xl font-light text-gray-900 mb-2">Translate</h1>
      <p className="text-xl text-gray-600">
        Break language barriers with our powerful translation tool.
      </p>
    </div>{" "}
    <div className="rounded-none overflow-hidden">
      <div className="p-2">
        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="source-lang"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              From
            </label>
            <div className="relative">
              <select
                id="source-lang"
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-none leading-tight focus:outline-none focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Detect language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="target-lang"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              To
            </label>
            <div className="relative">
              <select
                id="target-lang"
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-none leading-tight focus:outline-none focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Select language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <textarea
              className="w-full h-64 bg-ibm-gray-10 border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:ring-2 focus:ring-ibm-blue-60 resize-none"
              placeholder="Enter text to translate"
              defaultValue={""}
            />
          </div>
          <div className="w-1/2">
            <div className="w-full h-64 bg-ibm-gray-10 border border-gray-300 rounded-none py-2 px-3 overflow-y-auto">
              <p className="text-gray-500">Translation will appear here</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-orange-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Translate
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

  )
}

export default Translate