import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import GrammerSearch from "../model/grammerSearch.model.js";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

// data fetch for rephrase
export const rephrase = async (req, res) => {
  const { prompts } = req.body;
  try {
    const model = geminiModel;
    const prompt = `Rewrite this ${prompts} sentence in a manner that's suitable for a broad audience with varied levels of familiarity with the topic but do not make it concise. Provide a version of the text that is accessible to anyone, regardless of their expertise in the subject matter.provide the output in perfect JSON format using {"text":"value"}.\n.provide as many options upto 15.\n.do not write the word json.it should come in an array.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let getResponce = response?.candidates[0]?.content?.parts[0]?.text;
    let aiData = JSON.parse(getResponce);
    // console.log("aiData", aiData);
    res.status(200).json({ data: aiData });
  } catch (err) {
    console.log("errerror in repharse gemini", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// data fetch for normal or conersational
export const normal = async (req, res) => {
  const { prompts } = req.body;
  try {
    const model = geminiModel;
    const prompt = `Let's make ${prompts} this sentence sound like something you'd say to a friend over coffee. Rewrite the text in a laid-back, conversational tone. Imagine you're chatting with someone at a casual gathering. provide as many options upto 15. provide the output in perfect JSON format using {"text":"value"}.\n.do not write the word json.it should come in an array.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let getResponce = response?.candidates[0]?.content?.parts[0]?.text;
    let aiData = JSON.parse(getResponce);
    // console.log("aiData", aiData);
    res.status(200).json({ data: aiData });
  } catch (err) {
    console.log("errerror in normal gemini", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// data fetch for professaional or conersational
export const professional = async (req, res) => {
  const { prompts } = req.body;
  try {
    const model = geminiModel;
    const prompt = `Transform this ${prompts} sentence into language appropriate for a professional setting or formal document. Provide a version of the text suitable for academic or business contexts. Make the language more polished and refined, suitable for a formal audience. provide as many options upto 15. provide the output in perfect JSON format using {"text":"value"}.\n.do not write the word json.it should come in an array.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let getResponce = response?.candidates[0]?.content?.parts[0]?.text;
    let aiData = JSON.parse(getResponce);
    // console.log("aiData", aiData);
    res.status(200).json({ data: aiData });
  } catch (err) {
    console.log("errerror in professional gemini", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// data fetch for narrow
export const narrow = async (req, res) => {
  const { prompts } = req.body;
  try {
    const model = geminiModel;
    const prompt = `Condense this ${prompts} sentence for improved readability. Break down long sentences into shorter, easier-to-understand units. provide the output in perfect JSON format using {"text":"value"}.\n.provide as many options upto 15.\n.do not write the word json.it should come in an array.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let getResponce = response?.candidates[0]?.content?.parts[0]?.text;
    let aiData = JSON.parse(getResponce);
    // console.log("aiData", aiData);
    res.status(200).json({ data: aiData });
  } catch (err) {
    console.log("errerror in narrow gemini", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// data fetch for broader
export const broader = async (req, res) => {
  const { prompts } = req.body;
  try {
    const model = geminiModel;
    const prompt = `Elaborate on the following ${prompts} sentence to provide more detail or context. Add additional information to the text to enhance comprehension or convey a richer meaning. Lengthen the sentence without losing clarity or coherence. provide the output in perfect JSON format using {"text":"value"}.\n.provide as many options upto 15.\n.do not write the word json.it should come in an array.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let getResponce = response?.candidates[0]?.content?.parts[0]?.text;
    let aiData = JSON.parse(getResponce);
    // console.log("aiData", aiData);
    res.status(200).json({ data: aiData });
  } catch (err) {
    console.log("errerror in broader gemini", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// data fetch for synony
export const synony = async (req, res) => {
  const { prompts } = req.body;
  try {
    const model = geminiModel;
    const prompt = `Provide the synonyms for this word ${prompts}. provide as many options as possible. provide the output in perfect JSON format using {"text":"value"}.\n.do not write the word json.it should come in an array.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let getResponce = response?.candidates[0]?.content?.parts[0]?.text;
    let aiData = JSON.parse(getResponce);
    // console.log("aiData", aiData);
    res.status(200).json({ data: aiData });
  } catch (err) {
    console.log("errerror in repharse gemini", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGrammerData = async (req, res) => {
  try {
    const messages = await GrammerSearch.find({ userId: req.user._id });
    // console.log('messages', messages);
    res.status(200).json({data:messages});
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};
export const getGrammerDataById = async (req, res) => {
  const grammerId = req.params.grammerId;
  const userId = req.user._id;
  try {
    const messages = await GrammerSearch.findOne({
      _id: grammerId,
      userId: userId,
    });
    if (!messages) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({data:messages});
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

export const postGrammerData = async (req, res) => {
  // console.log('req.userId', req.user._id)
  try {
    const newPost = new GrammerSearch({
      title: req.body.title,
      grammer: req.body.grammer,
      userId: req.user._id,
      // ... other post data from request body
    });

    await newPost.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.log("err in the post grammer", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteGrammerData = async (req, res) => {
  try {
    const grammerId = req.params.grammerId;
    const userId = req.user._id;

    const deletedMessage = await GrammerSearch.findByIdAndDelete({
      _id: grammerId,
      userId: userId,
    }); // Ensure deleting user's message only

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting message" });
  }
};

export const updateGrammerData = async (req, res) => {
  try {
    const messageId = req.params.grammerId;
    const userId = req.user._id;
    const updateData = req.body; // Updated message data

    const updatedMessage = await GrammerSearch.findByIdAndUpdate(
      { _id: messageId, userId: userId },
      { $set: updateData },
      { new: true } // Return the updated document
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    console.log("err in updated message", err);
    res.status(500).json({ error: "Error updating message" });
  }
};
