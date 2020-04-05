const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category",required:true },
  professors: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  students: [{ type: Schema.Types.ObjectId, ref: "User", required: false }]
});

module.exports = mongoose.model("Course", courseSchema);