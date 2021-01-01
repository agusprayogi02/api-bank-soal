const model = require('../models')

const tutorial = model.tutorial

module.exports = {
  all: () => {
    return new Promise((rest, rej) => {
      tutorial
        .findAll()
        .then((res) => {
          rest(res)
        })
        .catch((err) => {
          rej(err)
        })
    })
  },
}
