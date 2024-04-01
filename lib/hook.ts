import {useMemo, useRef, useState} from 'react';
import {createVectorCollection, getResults} from "./similarity-search.ts";
import {Option, Result} from "./types.ts";
import {addDistanceToOptions} from "./utils.ts";

export const useSimilaritySelect = (props: {
    initialOptions: Option[],
    addDistance?: boolean
}) => {
    const options = useRef<Result[]>([]);
    const [, forceRender] = useState('');

    const vectorCollection = useMemo(() => {
        options.current = props.initialOptions;
        return createVectorCollection(props.initialOptions);
    }, [props.initialOptions]);

    const onInputChange = (newInput: string) => {
        options.current = getResults(newInput, vectorCollection);
        forceRender(newInput); // in order to sort the options by distance and add the distance in label
    };

    const filterOptions = (
        candidate: Option,
        input: string
    ) => {
        if (input) {
            const results = options.current.slice(0, 3);
            return results.some(result => result.value === candidate.value)
                || candidate.label.toLowerCase().includes(input.toLowerCase());
        }
        return true;
    };

    return {
        onInputChange,
        filterOptions,
        options: props.addDistance ? addDistanceToOptions(options.current) : options.current
    }
}
