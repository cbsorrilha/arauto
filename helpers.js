const filterQueryToObject = (filter) => {
  if(typeof filter !== 'string') {
    return {}
  }
  if (filter.indexOf(';') === -1 && filter.indexOf('=') === -1) {
    return {}
  }
  if (filter.indexOf(';') === -1) {
    const splited = filter.split('=')
    return { [splited[0]]: splited[1] }
  }
  return filter.split(';').reduce((stck, next) => {
    const splited = next.split('=')
    const value = splited[1].indexOf(',') !== -1 ? splited[1].split(',') : splited[1]
    const mapped =  { [splited[0]]: value }
    return { ...stck, ...mapped }
  }, {})
}

module.exports = {
  filterQueryToObject
}