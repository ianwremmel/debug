import {IDebugger} from 'debug';

/**
 * Simplified naming for 'debug'
 * @example
 * const {debug, format} = require('@ianwremmel/debug');
 * const d = debug(__filename);
 * const x = 2;
 * d(format`${true} ${x}`);
 * @param filename - pass `__filename` to keep your debug strings
 * consistent accross you project
 */
export function debug(filename: string): IDebugger;

/**
 * Colorizes variables based on type and returns them as chalked strings.
 */
export function colorize(value: any): string;

/**
 * Template string tag
 * @example
 * f`this is my string with variables like ${true} ${1} ${@ianwremmel/debug}`
 */
export function format(
  literals: TemplateStringsArray,
  ...placeholders: any[]
): string;
