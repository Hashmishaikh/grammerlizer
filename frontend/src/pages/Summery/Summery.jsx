import React, { useState } from 'react'

const Summery = () => {
    const [tabs,setTabs] = useState("uploadDocs");
    const switchTabs = (data) => {
        setTabs(data);
    }
    return (
        <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-2">Summarize</h1>
            <p className="text-xl text-gray-600">
              Condense your text into concise, meaningful summaries.
            </p>
          </div>
          <div className="overflow-hidden mb-6">
            <div className="p-3">
              <div className="mb-4">
                <label
                  htmlFor="input-text"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Input Text
                </label>
                <textarea
                  id="input-text"
                  rows={8}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ibm-blue focus:border-transparent"
                  placeholder="Paste or type your text here..."
                  defaultValue={""}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <label
                    htmlFor="summary-length"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Summary Length
                  </label>
                  <select
                    id="summary-length"
                    className="border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ibm-blue focus:border-transparent"
                  >
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>
                <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Summarise
                </button>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="output-summary"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Summary
                </label>
                <div
                  id="output-summary"
                  className="w-full h-40 border border-gray-300 rounded-none px-3 py-2 bg-gray-50 overflow-y-auto"
                >
                  Your summary will appear here...
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button className="text-ibm-blue hover:text-ibm-blue-hover focus:outline-none">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button className="text-ibm-blue hover:text-ibm-blue-hover focus:outline-none">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </button>
                </div>
                {/* <button class="text-ibm-blue hover:text-ibm-blue-hover focus:outline-none text-sm">
                                Advanced Options
                            </button> */}
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="p-1">
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                Tips for Better Summaries
              </h2>
              <ul className="list-disc list-inside space-y-0 text-gray-700">
                <li>Use clear and concise language in your original text</li>
                <li>Break down complex ideas into smaller, manageable parts</li>
                <li>
                  Highlight key points or use bullet points for important information
                </li>
                <li>Review and edit your summary for clarity and coherence</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
    )
}

export default Summery