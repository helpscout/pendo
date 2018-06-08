const sortByKey = (object = {}, sortFn) => {
  return Object.keys(object)
    .sort(sortFn)
    .reduce((newObject, key) => {
      newObject[key] = object[key]
      return newObject
    }, {})
}

module.exports = {
  sortByKey
}
