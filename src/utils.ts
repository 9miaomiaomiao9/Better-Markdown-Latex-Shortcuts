import * as mathjs from 'mathjs'

export function equal(text: string) {
    let value = 0
    try {
        value = mathjs.evaluate(toFrac(toPow(toFrac(toMultiply(removeDisplaystyle(text))))))
    } catch {
        return ''
    }
    return '=' + value
}

export function replace(text: string) {
    let value = 0
    try {
        value = mathjs.evaluate(toFrac(toPow(toFrac(toMultiply(removeDisplaystyle(text))))))
    } catch {
        return text
    }
    return '' + value
}

function removeDisplaystyle(text: string):string {
    return text.replace(/\\displaystyle/g, '')
}

function toMultiply(text: string):string {
    return text.replace(/\\times/g, '*')
}

function toPow(text: string):string {
    let old = text
    let pattern = /\^{([+-]?[0-9\s\*/+-^()i]+)}/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\^{([+-]?[0-9\s\*/+-^()i]+)}/g
        let array = pattern.exec(str)
        if (array) {
            text = text.replace(str, `^(${array[1]})`)
        }
    })
    if (old === text) { return text }
    else {
        return toPow(text)
    }
}

function toFrac(text: string):string {
    let old = text
    let pattern = /\\frac{([0-9\s\*/+-^()i]+)}{([0-9\*/+-^()i]+)}/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\\frac{([0-9\s\*/+-^()i]+)}{([0-9\*/+-^()i]+)}/g
        let array = pattern.exec(str)
        if (array) {
            text = text.replace(str, `((${array[1]})/(${array[2]}))`)
        }
    })
    if (old === text) { return text }
    else {
        return toFrac(text)
    }
}