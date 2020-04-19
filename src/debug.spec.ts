import {debug} from '.';

describe('debug', () => {
  it('produces a wrapper around debug that accepts a filename', () => {
    const d = debug('foo');
    d.enabled = true;

    const spy = jest.spyOn(process.stderr, 'write');
    spy.mockReset();

    d('bar');
    // reminder: colors are disabled in package.json because they will be
    // disabled automatically in CI
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "debug:foo bar
      ",
        ],
      ]
    `);

    spy.mockClear();
  });
});
