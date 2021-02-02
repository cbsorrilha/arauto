const filterQueryToObject = (filter) => {
  const breakByComma = (splited) => {
    const value = splited[1].indexOf(',') !== -1 ? splited[1].split(',') : splited[1]
    return  { [splited[0]]: value }
  }
  if(typeof filter !== 'string' || filter.indexOf('=') === -1) {
    return {}
  }

  if (filter.indexOf(';') === -1) {
    const splited = filter.split('=')
    return breakByComma(splited)
  }

  return filter.split(';').reduce((stck, next) => {
    const splited = next.split('=')
    const mapped = breakByComma(splited)
    return { ...stck, ...mapped }
  }, {})
}

module.exports = {
  filterQueryToObject
}