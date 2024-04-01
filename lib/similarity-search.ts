import {Option} from "./types.ts";

const word2vec = (word: string) => {
    const vector = [];
    const maxVectorLength = 8;
    for (const char of word.toLocaleLowerCase()) {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) { // a-z
            vector.push(charCode - 96);
        } else {
            vector.push(charCode);
        }
    }

    while (vector.length < maxVectorLength) {
        vector.push(0);
    }

    return vector.slice(0, maxVectorLength);
}

const cosineSimilarity = (a: number[], b: number[]) => {
    const dotProduct = a.reduce((acc, _, i) => acc + a[i] * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((acc, _, i) => acc + a[i] * a[i], 0));
    const magnitudeB = Math.sqrt(b.reduce((acc, _, i) => acc + b[i] * b[i], 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export const createVectorCollection = <T extends Option>(items: T[]): (T & { vector: number[] })[] => {
    return items.reduce((acc: (T & { vector: number[] })[], item: T) => {
        acc.push({
            ...item,
            vector: word2vec(item.label),
        });
        return acc;
    }, []);
}

export const getResults = <T extends { vector: number[]; similarity?: number }>(query: string, items: T[]): T[] => {
    const queryVector = word2vec(query);
    const results: T[] = [];
    for (const item of items) {
        results.push({
            ...item,
            similarity: cosineSimilarity(queryVector, item.vector)
        });
    }
    // Sort results by similarity
    results.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
    return results;
}
