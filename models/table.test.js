const TableModel = require('./table')

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

describe("Testing table model",  () => {
  it('should be invalid if narratorId is null', (done) => {    
    const t = new TableModel({ ...test, narratorId: undefined })
    t.validate().catch((err) => {
      expect(err.errors.narratorId).toBeTruthy()
      done()
    })
  })
  
  it('should be invalid if name is null', (done) => {
    const t = new TableModel({ ...test, name: undefined })
    t.validate().catch((err) => {
      expect(err.errors.name).toBeTruthy()
      done()
    })
  })

  it('should be invalid if description is null', (done) => {
    const t = new TableModel({ ...test, description: undefined })
    t.validate().catch((err) => {
      expect(err.errors.description).toBeTruthy()
      done()
    })
  })

  it('should be invalid if system is null', (done) => {
    const t = new TableModel({ ...test, system: undefined })
    t.validate().catch((err) => {
      expect(err.errors.system).toBeTruthy()
      done()
    })
  })
  

})