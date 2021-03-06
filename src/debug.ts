import {readFileSync} from 'fs';
import {dirname, sep, extname} from 'path';

import _debug from 'debug';
import invariant from 'invariant';
// pkg-up is an `export = ` default which breaks import/default
// eslint-disable-next-line import/default
import pkgUp from 'pkg-up';

/**
 * Simplified naming for 'debug'
 * @example
 * const {debug, format} = require('@ianwremmel/debug');
 * const d = debug(__filename);
 * const x = 2;
 * d(format`${true} ${x}`);
 * @param filename - pass `__filename` to keep your debug strings consistent
 * across you project.
 */
export function debug(filename: string) {
  invariant(filename, '$filename is required');
  invariant(typeof filename === 'string', '$filename must be a string');

  const pkgPath = pkgUp.sync({cwd: dirname(filename)});
  if (!pkgPath) {
    throw new Error('Could not determine package path');
  }
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
