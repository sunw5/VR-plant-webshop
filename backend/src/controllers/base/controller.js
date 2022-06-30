const express = require('express');
const createError = require('http-errors');
const baseService = require('./service');

const checkModel = (model, body, next) => {
  const validationErrors = new model(body).validateSync();
  if (validationErrors) {
    next(
      new createError.BadRequest(
        JSON.stringify({
          message: 'Scmema validation error',
          error: validationErrors,
        })
      )
    );
    return false;
  }
  return true;
};

module.exports = (model, populates = []) => {
  const currentService = baseService(model, populates);
  return {
    create: (req, res, next) => {      
      return currentService
        .create(req.body)
        .then((cp) => {
          res.status(201);
          res.json(cp);
        })
        .catch((err) => {
          next(new createError.InternalServerError(err.message));
        });
    },

    findAll: (req, res, next) => {
      return currentService.findAll().then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(new createError.InternalServerError(err.message));
      });
    },

    findOne: (req, res, next) => {
      return currentService
        .findOne(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => {
          return err.name === 'CastError'
            ? next(new createError.NotFound('data is not found'))
            : next(new createError.InternalServerError(err.message));
        });
    },

    update: (req, res, next) => {      
      return currentService
        .update(req.params.id, req.body)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          next(new createError.InternalServerError(err.message));
        });
    },

    delete: (req, res, next) => {
      return currentService
        .delete(req.params.id)
        .then((response) => res.json(response))
        .catch((err) => {
          next(new createError.InternalServerError(err.message));
        });
    },
  };
};
