import {stdout as supportsColor} from 'supports-color';
import chalk from 'chalk';

/**
 * Colorizes variables based on type and returns them as chalked strings.
 * @param value
 * @returns {string}
 */
export function colorize(value: any) {
  if (!supportsColor) {
    return `"${value}"`;
  }

  switch (typeof value) {
    case 'boolean':
      return value ? chalk.green(String(value)) : chalk.red(String(value));
    case 'number':
      return chalk.blue(String(value));
    case 'string':
      // node modules
      if (value.startsWith('@')) {
        return chalk.gray(value);
      }
      // filenames
      if (value.includes('/')) {
        return chalk.magenta(value);
      }
      // strings
      return chalk.cyan(value);
    default:
      return chalk.grey(value);
  }
}

/**
 * Template string tag
 * @example
 * f`this is my fancy string with variables like ${true} ${1} ${@ianwremmel/debug}`
 * @param literals
 * @param placeholders
 */
export function format(literals: TemplateStringsArray, ...placeholders: any[]) {
  return literals.reduce((str, literal, index) => {
    const placeholder = placeholders[index];
    if (!placeholder) {
      return str + literal;
    }
    return str + literal + colorize(placeholders[index]);
  }, '');
}
