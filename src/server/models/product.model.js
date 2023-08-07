const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  term: { type: Number, required: true }, // Term in days
  dailyIncome: { type: Number, required: true }, // Daily income
  totalRevenue: { type: Number, required: true } // Total revenue
})

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema)
