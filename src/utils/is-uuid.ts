export function isUUID(str: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(str)) {
        console.log("Valid UUID: " + str);
        return true;
    } else {
        console.log("Invalid UUID: " + str);
        return false;
    }
}
