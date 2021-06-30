export function getOneOfSequence(length: number) {
    if (!Number.isInteger(length) || length < 0) {
        throw new Error('length must be a positive integer');
    }
    return Math.floor(Math.random() * length);
}
