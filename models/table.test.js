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
  describe("Testing model validation", () => {
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
  describe("Testing model parseFilters static methods", () => {
    it('should retrieve text filter with the given narratorId property', () => {
      const filter = TableModel.parseFilters({narratorId: 'foo'})
      expect(filter).toStrictEqual({ narratorId: 'foo'})
    })

    it('should retrieve text filter with the given name property', () => {
      const filter = TableModel.parseFilters({name: 'foo'})
      expect(filter).toStrictEqual({ $text : { $search : 'foo' } })
    })

    it('should retrieve text filter with the given system property', () => {
      const filter = TableModel.parseFilters({system: 'foo'})
      expect(filter).toStrictEqual({ $text : { $search : 'foo' } })
    })

    it('should retrieve text filter with the given tag property', () => {
      const filter = TableModel.parseFilters({tags: 'foo'})
      expect(filter).toStrictEqual({ tags: 'foo' })
    })

    it('should retrieve text filter with the given tag property', () => {
      const filter = TableModel.parseFilters({tags: 'foo', name: 'bar'})
      expect(filter).toStrictEqual({ tags: 'foo', $text : { $search : 'bar' } })
    })

    it('should retrive an $in object if many tags are given',  () => {
      const filter = TableModel.parseFilters({tags: ['foo', 'bar']})
      expect(filter).toStrictEqual({ tags: {$in: ['foo', 'bar']} })
    })

    it('should retrieve text filter with the given online property', () => {
      const filter = TableModel.parseFilters({online: 'foo'})
      expect(filter).toStrictEqual({ online: 'foo'})
    })

    it('should retrieve text filter with the given recruiting property', () => {
      const filter = TableModel.parseFilters({recruiting: 'foo'})
      expect(filter).toStrictEqual({ recruiting: 'foo'})
    })
  })
})