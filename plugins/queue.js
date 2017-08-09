'use strict';

const Joi = require('joi');
const executor = require('./executor');
const SCHEMA_EXECUTOR_CONFIG = Joi.object().keys({
    name: Joi.string().required(),
    options: Joi.object().required()
}).required();
const SCHEMA_START = Joi.object().keys({
    buildConfig: executor.start,
    executor: SCHEMA_EXECUTOR_CONFIG
}).required();

module.exports = {
    /**
     * Validates the queue job config generated by the START method in executor-queue
     *
     * @property start
     * @type {Joi}
     */
    start: SCHEMA_START
};