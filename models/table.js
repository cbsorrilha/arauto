const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
  narratorId: {type: String, required: true, index: true},
  name: {type: String, required: true, index: true,},
  thumbnail: String,
  cover: String,
  description: {type: String, required: true,},
  system: {type: String, required: true, index: true},
  online: {type: Boolean, default: true,},
  tags: [String],
  players: [String],
  address: {
    street: String,
    streetType: String,
    number: String,
    neighborhood: String,
    city: String,
    state: String,
  },
});

tableSchema.index({ name: 'text', system: 'text' });

const TableModel = mongoose.model('Table', tableSchema)

module.exports = TableModel