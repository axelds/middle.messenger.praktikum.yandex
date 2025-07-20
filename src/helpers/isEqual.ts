function isEqual(a: object, b: object): boolean {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }

    for (const key of Object.keys(a) as (keyof typeof a)[]) {
        if (typeof a[key] === 'object' && typeof b[key] === 'object') {
            if (!isEqual(a[key], b[key])) {
                return false;
            }
        } else if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

export default isEqual
