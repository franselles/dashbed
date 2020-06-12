'use strict';

const Cities = require('../models/cities_model');

function getCities(req, res) {
  Cities.find().exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`,
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe',
      });

    res.status(200).send(doc);
  });
}

function redireccion(req, res) {
  res.redirect('https://dashbed-down-19019.herokuapp.com/#/select');
}

module.exports = {
  getCities,
  redireccion,
};
