'use strict';

const Annotations = require('./annotations');
const Job = require('./job');
const Joi = require('joi');
const Regex = require('./regex');
const Workflow = require('./workflow');

const SCHEMA_JOBS = Joi.object()
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    .pattern(Regex.JOB_NAME, Job.job)
    // All others are marked as invalid
    .unknown(false);
const SCHEMA_SHARED = Job.job;
const SCHEMA_CONFIG = Joi.object()
    .keys({
        version: Joi.number().integer().min(1).max(50),
        annotations: Annotations.annotations,
        jobs: SCHEMA_JOBS,
        shared: SCHEMA_SHARED,
        workflow: Workflow.workflow
    })
    .requiredKeys('jobs')
    .unknown(false);

/**
 * Main pieces of a screwdriver.yaml
 * @type {Object}
 */
module.exports = {
    jobs: SCHEMA_JOBS,
    shared: SCHEMA_SHARED,
    config: SCHEMA_CONFIG
};
