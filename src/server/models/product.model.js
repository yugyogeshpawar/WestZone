const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  term: { type: Number, required: true }, // Term in days
  dailyIncome: { type: Number, required: true }, // Daily income
  totalRevenue: { type: Number, required: true }, // Total revenue
  paragraph1: { type: String, required: false }, // New paragraph field
  paragraph2: { type: String, required: false }, // New paragraph field
  paragraph3: { type: String, required: false }, // New paragraph field
  paragraph4: { type: String, required: false }, // New paragraph field
  paragraph5: { type: String, required: false },  // New paragraph field
  isDeleted: { type: Boolean, default: false } 
})

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema)
