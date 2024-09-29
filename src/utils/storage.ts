// utils/storage.ts
export const setItem = (key: string, value: { token: any; user: any }) => {
    if (typeof window !== 'undefined') {
        // @ts-ignore
        localStorage.setItem(key, value);
    }
};

export const getItem = (key: string) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

export const setJsonItem = (key: any, value: any) => {
    try {
        // @ts-ignore
        setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error in setJsonItem ${key} - ${error}`);
    }
};

export const getJsonItem = (key: any) => {
    try {
        const item = getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error in getJsonItem ${key} - ${error}`);
        return null;
    }
};

export const removeItem = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
