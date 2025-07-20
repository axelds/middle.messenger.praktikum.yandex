type Indexed<T = unknown> = {
  [key: string]: T | Indexed<T>;
};
function set<T>(object: Indexed<T>, path: string, value: T): Indexed<T> {
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    if (typeof object !== 'object' || object === null) {
        return value as unknown as Indexed<T>;
    }

    const pathItems = path.split('.');
    let currentObject = object;

    for (let i = 0; i < pathItems.length - 1; i++) {
        const item = pathItems[i];
        if (!currentObject.hasOwnProperty(item)) {
            currentObject[item] = {};
        }
        currentObject = currentObject[item] as Indexed<T>;
    }

    const lastItem = pathItems[pathItems.length - 1];
    currentObject[lastItem] = value;

    return object;
}

export default set
