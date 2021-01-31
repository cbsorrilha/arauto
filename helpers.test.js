const {filterQueryToObject} = require('./helpers')

describe("Test helper functions", () => {

  describe('should test filterQueryToObject function', () => {
    it('should return an empty object when the parameter is not a string', () => {
      expect(filterQueryToObject()).toStrictEqual({})
    })

    it('should return an empty object when the parameter is not a string', () => {
      expect(filterQueryToObject("")).toStrictEqual({})
    })

    it('should return a object with the given query', () => {
      expect(filterQueryToObject("a=b")).toStrictEqual({"a": "b"})
    })

    it('should return a object with the given query', () => {
      expect(filterQueryToObject("a=b;c=d;e=f")).toStrictEqual({
        "a": "b",
        "c": "d",
        "e": "f"
      })
    })
  })
})