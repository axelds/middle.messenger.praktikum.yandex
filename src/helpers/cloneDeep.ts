function cloneDeep<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(item => (typeof item === 'object' && item !== null ? cloneDeep(item) : item)) as unknown as T;
    } else if (typeof obj === 'object' && obj !== null) {
        const clone = {} as T;
        Object.keys(obj).forEach(key => {
            const value = obj[key as keyof T];
            clone[key as keyof T] = typeof value === 'object' && value !== null ? cloneDeep(value) : value;
        });
        return clone;
    }
    return obj;
}

export default cloneDeep;
