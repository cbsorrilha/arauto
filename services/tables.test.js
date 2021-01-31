const {createTable, getTables} = require('./tables')
jest.mock('../models/table')

const TableModel = require('../models/table')

const test = {
  narratorId: 'table.narratorId',
  name: 'table.name',
  thumbnail: 'table.thumbnail',
  cover: 'table.cover',
  description: 'table.description',
  system: 'table.system',
  online: 'table.online',
  tags: 'table.tags',
  players: 'table.players',
  address: 'table.address',
}

const save = jest.spyOn(TableModel.prototype,'save').mockImplementation(() => Promise.resolve())

const exec = jest.fn().mockImplementation(() => Promise.resolve([test]))
const skip = jest.fn().mockImplementation(() => ({exec}))
const limit = jest.fn().mockImplementation(() => ({skip}))
const find = jest.spyOn(TableModel,'find').mockImplementation(() => ({ limit }))

const countDocuments = jest.spyOn(TableModel,'countDocuments').mockImplementation(() => 1)

describe('Testing the service methods', () => {

  
  describe('Testing the createTable', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })
    
    it('should be a function', () => {
      expect(typeof createTable).toBe('function')
    })
    
    it('should call TableModel ', () => {
      try {
        createTable(test)
        expect(TableModel).toHaveBeenCalledWith(test)
      } catch (error) {
        console.error(error)
        throw error
      }
    })

    it('should call save model method ', () => {
      try {
        createTable(test)
        expect(save).toBeCalled()
      } catch (error) {
        console.error(error)
        throw error
      }
    })

    it('should return a instance of TableModel', async (done) => {
      try {
        expect(createTable(test)).toBeInstanceOf(Promise)
        await expect(createTable(test)).resolves.toBeInstanceOf(Object)
        done()
      } catch (error) {
        console.error(error)
        throw error
      }
    })

    it('should throw an error in case of error', async (done) => {
      TableModel.mockImplementation(() => {throw "Test"})
      try {
        expect(createTable(test)).toBeInstanceOf(Promise)
        await expect(createTable(test)).rejects.toBe("Test")
        done()
      } catch (error) {
        console.error(error)
        throw error
      }
    })
    
  })

  describe('Testing the getTables', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should be a function', () => {
      expect(typeof getTables).toBe('function')
    })
    
    it('should call TableModel.find and subsequent methods', async () => {
      try {
        await getTables({page: 1, limit: 1, filters: {}})
        expect(find).toBeCalled()
        expect(limit).toBeCalled()
        expect(skip).toBeCalled()
        expect(exec).toBeCalled()
        expect(countDocuments).toBeCalled()
        
      } catch (error) {
        console.error(error)
        throw error
      }
    })

    it('should return test table', async () => {
      try {
        const valid = {
          tables: [test],
          totalPages: 1,
          currentPage: 1,
        }
        await expect(getTables({page: 1, limit: 1, filters: {}})).resolves.toStrictEqual(valid)
      } catch (error) {
        console.error(error)
        throw error
      }
    })

    it('should return test table with name filter', async () => {
      try {
        const valid = {
          tables: [test],
          totalPages: 1,
          currentPage: 1,
        }
        await expect(getTables({page: 1, limit: 1, filters: { name: 'filters.name' }})).resolves.toStrictEqual(valid)
        expect(find).toHaveBeenCalledWith({ $text : { $search : 'filters.name' } })
      } catch (error) {
        console.error(error)
        throw error
      }
    })
  })
})