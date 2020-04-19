import {df} from '.';

describe('df', () => {
  it('produces a template string that combines the functionality of debug() and format', () => {
    const d = df('foo');
    // @ts-ignore - only here for writing tests
    d.enabled = true;

    const spy = jest.spyOn(process.stderr, 'write');
    spy.mockReset();

    d`${5} is a number`;
    d`${true} is a boolean`;
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "debug:foo [34m5[39m is a number
      ",
        ],
        Array [
          "debug:foo [32mtrue[39m is a boolean
      ",
        ],
      ]
    `);

    spy.mockClear();
  });
});
