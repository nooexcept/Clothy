import { withLimitedWords } from '../src/util'

describe('withLimitedWords', () => {
    it('should work as expected', () => {
        expect(withLimitedWords('hello world', 1)).toBe('hello')
        expect(
            withLimitedWords(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                4
            )
        ).toBe('Lorem ipsum dolor sit')
        expect(withLimitedWords('hello world', 50)).toBe('hello world')
        expect(withLimitedWords('hello', 2)).toBe('hello')
    })
})
