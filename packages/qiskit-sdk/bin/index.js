#!/usr/bin/env node

/**
 * @license
 *
 * Copyright (c) 2017-present, IBM Research.
 *
 * This source code is licensed under the Apache license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const yargs = require('yargs');

const qiskit = require('..');
const logger = require('./lib/logger');
const storage = require('./lib/storage');

// To share it among the different QE related commands.
global.qiskit = { cloud: new qiskit.Cloud() };

storage
  .getItem('token')
  .then(token => {
    if (token) {
      global.qiskit.cloud.token = token;
    }

    // Starting the console cli.
    // eslint-disable-next-line no-unused-expressions
    yargs.commandDir('./cmds').demandCommand().argv;
  })
  .catch(err => {
    logger.error('Looking for a long term token', err);
    process.exit(1);
  });
