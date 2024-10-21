import React, { useRef, useState } from "react";
import { privateRequest } from "../api/privateRequest";
import toast from "react-hot-toast";

const useContent = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const abortControllerRef = useRef(null); 

  const searchContent = async (content, api) => {
     // Cancel the previous request if it exists
     if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setContent([])
    setLoading(true);
    try {
      const data = await privateRequest.post(api, { prompts: content }, {
        signal: abortController.signal, // Pass the abort signal to the request
      });
      console.log("data", data?.data?.data);
      setContent(data?.data?.data);
      setLoading(false); // Only set loading to false if the request completes successfully
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was canceled");
      } else {
        console.log("err", err);
        toast.error(err.response.data.message);
        setLoading(false); // Set loading to false if there's an error other than a cancelation
      }
    } 
  };
  return { searchContent,setContent, loading,content };
};

export default useContent;
