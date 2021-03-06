/**
 * @license
 *
 * Copyright (c) 2017-present, IBM Research.
 *
 * This source code is licensed under the Apache license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const utils = require('./utils');
const { name, version } = require('../package');

const dbg = utils.debug(name);

module.exports = (neededQubits = 4) => {
  let circuit =
    `// Cirtuit generated by QISKit.js, version: ${version}\n\n` +
    // Includes.
    'include "qelib1.inc";\n\n' +
    // Register declarations.
    `qreg q[${neededQubits}];\n` +
    `creg c[${neededQubits}];\n\n`;

  let i = 0;
  utils.times(neededQubits, () => {
    circuit += `h q[${i}];\n`;
    i += 1;
  });

  circuit += '\n';

  i = 0;
  utils.times(neededQubits, () => {
    circuit += `measure q[${i}] -> c[${i}];\n`;
    i += 1;
  });

  dbg('Built circuit:', { circuit });
  return circuit;
};
