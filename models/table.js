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

tableSchema.statics.parseFilters = (filters) => {
  const parsedFilters = []

  if(filters.name && !filters.system) {
    parsedFilters.push({ $text : { $search : filters.name } }) 
  }

  if(filters.system && !filters.name) {
    parsedFilters.push({ $text : { $search : filters.system } }) 
  }

  if(filters.tags && !Array.isArray(filters.tags)) {
    parsedFilters.push({tags: filters.tags})
  }
  
  if(filters.tags && Array.isArray(filters.tags)) {
    parsedFilters.push({tags: { $in: filters.tags }})
  }

  return parsedFilters.reduce((stck, nxt) => ({...stck, ...nxt}), {})
}

const TableModel = mongoose.model('Table', tableSchema)

module.exports = TableModel