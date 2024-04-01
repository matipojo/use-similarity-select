import {Result} from "./types.ts";

export const formatOptionWithSimilarity = (option: Result) => {
    let similarity = option.similarity;
    if (!similarity) {
        return option.label;
    }

    if (similarity > 0.999999) {
        similarity = 1;
    } else {
        similarity = Math.floor(similarity * 100) / 100;
    }

    return option.label + ` (${similarity.toFixed(2)})`;
}

export const addDistanceToOptions = (options: Result[]) => {
    return options.map((option) => {
        return {
            ...option,
            label: formatOptionWithSimilarity(option),
        };
    });
}
