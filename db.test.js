const mongoose = require('mongoose')
const {promisedDBConnection} = require('./db')

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
  }
}));

console.error = jest.fn()

describe('testing promisedDBConnection', () => {
  it('should return a promise', () => {
    expect(promisedDBConnection()).toBeInstanceOf(Promise)
  })
  
  it('should call on and once', () => {
    expect(mongoose.connection.on).toBeCalled()
    expect(mongoose.connection.once).toBeCalled()
  })

  it('should reject and return the db instance', async () => {
    try {
      expect.assertions(2);
      mongoose.connection.on.mockImplementation((_, fun) => {
        fun()
      })
      await expect(promisedDBConnection()).rejects.toEqual(mongoose.connection);
      expect(console.error).toHaveBeenCalledWith('connection error:')
      
    } catch (error) {
      console.error(error)
    }
  })

  it('should resolve and return the db instance', async () => {
    try {
      expect.assertions(1);
      mongoose.connection.on.mockImplementation(() => {})
      mongoose.connection.once.mockImplementation((_, fun) => {
        fun()
      })
      await expect(promisedDBConnection()).resolves.toEqual(mongoose.connection);  
    } catch (error) {
      console.error(error)
      throw error
    }
    
  })
})