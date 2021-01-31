const TableModel = require('../models/table')

const createTable = async (table) => {
  try {
    const newTable = new TableModel({
      narratorId: table.narratorId,
      name: table.name,
      thumbnail: table.thumbnail,
      cover: table.cover,
      description: table.description,
      system: table.system,
      online: table.online,
      tags: table.tags,
      players: table.players,
      address: table.address,
    });
  
    await newTable.save()
  
    return newTable
  } catch (error) {
    throw error
  }
}

const parseFilters = (filters) => {
  const parsedFilters = []

  if(filters.name) {
    parsedFilters.push({ $text : { $search : filters.name } }) 
  }

  if(filters.system) {
    parsedFilters.push({ $text : { $search : filters.system } }) 
  }

  if(filters.tags) {
    parsedFilters.push({tags: filters.tags})
  }

  return parsedFilters.reduce((stck, nxt) => ({...stck, ...nxt}), {})
}

const getTables = async ({ page, limit, filters }) => {
  try {
    const parsedFilters = parseFilters(filters)
    const tables = await TableModel
    .find(parsedFilters)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
    
    const count = await TableModel.countDocuments(parsedFilters);
    
    return {
      tables,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };

  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  createTable,
  getTables,
}