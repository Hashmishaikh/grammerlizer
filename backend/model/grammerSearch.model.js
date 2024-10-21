import mongoose from "mongoose";

const grammerSearchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    grammer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GrammerSearch = mongoose.model("GrammerSearch", grammerSearchSchema);

export default GrammerSearch;
