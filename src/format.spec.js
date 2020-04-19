import {colorize, format} from './format';

describe('colorize()', () => {
  it('colors various primitives', () => {
    expect(colorize(true)).toMatchInlineSnapshot(`"[32mtrue[39m"`);
    expect(colorize(5)).toMatchInlineSnapshot(`"[34m5[39m"`);
    expect(colorize('foo')).toMatchInlineSnapshot(`"[36mfoo[39m"`);
    expect(colorize('@foo')).toMatchInlineSnapshot(`"[90m@foo[39m"`);
    expect(colorize('/foo')).toMatchInlineSnapshot(`"[35m/foo[39m"`);
    expect(colorize({})).toMatchInlineSnapshot(`"[90m[object Object][39m"`);
  });
});

describe('format()', () => {
  it('colorizes the variables in a string', () => {
    expect(
      format`a ${true} b ${5} c ${'foo'} ${'@foo'} ${'/foo'} ${{}}`
    ).toMatchInlineSnapshot(`"a [32mtrue[39m b [34m5[39m c [36mfoo[39m [90m@foo[39m [35m/foo[39m [90m[object Object][39m"`);
  });
});
