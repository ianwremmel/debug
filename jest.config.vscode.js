'use strict';

process.env.TZ = 'UTC';

const config = require('./jest.config');

config.collectCoverage = true;

module.exports = config;
