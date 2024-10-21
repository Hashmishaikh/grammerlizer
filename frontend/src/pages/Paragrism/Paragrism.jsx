import React from 'react'

const Paragrism = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
  <div className="max-w-7xl mx-auto">
    <h1 className="ibm-h1 mb-6">Plagiarism Checker</h1>
    {/* Text Input Area */}
    <div className="mb-6">
      <label
        htmlFor="content"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Enter your text
      </label>
      <div className="bg-white border border-gray-300 rounded-md shadow-sm">
        <textarea
          className="block w-full border-0 p-4 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          style={{
            maxHeight: 400,
            minHeight: 300,
            height: "auto",
            overflowY: "auto",
            resize: "vertical"
          }}
          placeholder="Start writing or paste your text here..."
          defaultValue={""}
        />
      </div>{" "}
    </div>
    {/* File Upload */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Or upload a file
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            DOC, DOCX, PDF, TXT up to 10MB
          </p>
        </div>
      </div>
    </div>
    {/* Plagiarism Check Options */}
    <div className="mb-6">
      <h2 className="ibm-h3 mb-4">Check Options</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="check-web"
            name="check-web"
            type="checkbox"
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label
            htmlFor="check-web"
            className="ml-2 block text-sm text-gray-900"
          >
            Check against web sources
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="check-academic"
            name="check-academic"
            type="checkbox"
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label
            htmlFor="check-academic"
            className="ml-2 block text-sm text-gray-900"
          >
            Check against academic databases
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="check-publications"
            name="check-publications"
            type="checkbox"
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label
            htmlFor="check-publications"
            className="ml-2 block text-sm text-gray-900"
          >
            Check against published works
          </label>
        </div>
      </div>
    </div>
    {/* Action Buttons */}
    <div className="flex space-x-4">
      <button className="bg-orange-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
        Check Plagiarism
      </button>
      <button className="bg-white text-gray-700 px-6 py-3 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
        Clear
      </button>
    </div>
  </div>
</main>


  )
}

export default Paragrism