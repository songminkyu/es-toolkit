import { describe, expect, expectTypeOf, it } from 'vitest';
import type { isRegExp as isRegExpLodash } from 'lodash';
import { isRegExp } from './isRegExp';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';
import { stubFalse } from '../util/stubFalse';

/**
 * https://github.com/lodash/lodash/blob/main/test/isRegExp.spec.js
 */
describe('isRegExp', () => {
  it('returns `true` for RegExp', () => {
    expect(isRegExp(/x/)).toBe(true);
    expect(isRegExp(RegExp('x'))).toBe(true);
  });

  it('returns `false` for non-RegExp values', () => {
    const expected = falsey.map(stubFalse);

    const actual = falsey.map((value, index) => {
      return index ? isRegExp(value) : isRegExp();
    });

    expect(actual).toEqual(expected);

    expect(isRegExp(args)).toBe(false);
    expect(isRegExp([1, 2, 3])).toBe(false);
    expect(isRegExp(true)).toBe(false);
    expect(isRegExp(new Date())).toBe(false);
    expect(isRegExp(new Error())).toBe(false);
    expect(isRegExp(slice)).toBe(false);
    expect(isRegExp({ a: 1 })).toBe(false);
    expect(isRegExp(1)).toBe(false);
    expect(isRegExp('a')).toBe(false);
    expect(isRegExp(symbol)).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isRegExp).toEqualTypeOf<typeof isRegExpLodash>();
  });
});
