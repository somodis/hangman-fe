import words from './../assets/words.json';

export function getWord(): string {
    return getRandomItem(words).toUpperCase()
}

function getRandomItem<T>(items: Array<T>): T {
    return items[Math.floor(Math.random() * items.length)]
}
