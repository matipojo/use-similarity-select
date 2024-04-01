export type Option = {
    value: string;
    label: string;
}

export type Result = Option & {
    similarity?: number;
}
