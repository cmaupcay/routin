export const MAX = "max";
export type Max = typeof MAX;

export const MIN = "min";
export type Min = typeof MIN;

export type type = Max | Min;
export const types: Iterable<type> = [
    MAX,
    MIN
];