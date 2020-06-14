export function withLimitedWords(str: string, wordQuantity: number): string {
    const formattedStr = str + ' '
    let previousIndex = formattedStr.indexOf(' ')
    if (previousIndex === -1) return str
    previousIndex += 1

    for (let i = 1; i < wordQuantity; i += 1) {
        const spaceIndex = formattedStr.indexOf(' ', previousIndex)
        if (spaceIndex === -1) break
        previousIndex = spaceIndex + 1
    }

    return str.substring(0, previousIndex)
}
