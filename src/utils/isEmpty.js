export function isEmptyOrWhitespace(str) {
    return !str || /^\s*$/.test(str);
}