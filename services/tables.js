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

const getTables = async ({ page, limit, filters }) => {
  try {
    const parsedFilters = TableModel.parseFilters(filters)
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