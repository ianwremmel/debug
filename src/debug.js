import {readFileSync} from 'fs';
import {dirname, sep, extname} from 'path';

import _debug from 'debug';
import invariant from 'invariant';
import {sync as pkgup} from 'pkg-up';

/**
 * Simplified naming for 'debug'
 * @example
 * const {debug, format} = require('@ianwremmel/debug');
 * const d = debug(__filename);
 * const x = 2;
 * d(format`${true} ${x}`);
 * @param {string} filename - pass `__filename` to keep your debug strings
 * consistent accross you project
 * @returns {_debug.IDebugger}
 */
export function debug(filename) {
  invariant(filename, '$filename is required');
  invariant(typeof filename === 'string', '$filename must be a string');

  const pkgPath = pkgup(filename);
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  const packageName = pkg.name;
  const unscopedPackageName = packageName.includes('/')
    ? packageName.split('/').pop()
    : pkg.name;

  const localName = filename
    .replace(dirname(pkgPath), '')
    .replace(new RegExp(`^${sep}`), '')
    .replace(extname(filename), '')
    .replace(new RegExp(sep, 'g'), ':');

  const prefix = `${unscopedPackageName}:${localName}`;
  return _debug(prefix);
}
