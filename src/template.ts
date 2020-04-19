import {debug} from './debug';
import {format} from './format';

/**
 * Template tag factory that combines debug() and format().
 */
export function df(filename: string) {
  const d = debug(filename);

  const f = (literals: TemplateStringsArray, ...placeholders: any[]) => {
    return d(format(literals, ...placeholders));
  };

  Object.defineProperty(f, 'enabled', {
    /** getter */
    get() {
      return d.enabled;
    },
    /** setter */
    set(value: boolean) {
      d.enabled = value;
    }
  });

  Object.defineProperty(f, 'log', {
    /** getter */
    get() {
      return d.log;
    },
    /** setter */
    set(value: (...args: any[]) => any) {
      d.log = value;
    }
  });

  return f;
}
