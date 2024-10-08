export const INDIVIDUAL_TYPE = {
    PERSON: {
        getValue: () => 0,
        getName: () => 'PERSON',
        getPersianName: () => 'حقیقی',
    },
    ORGANIZATION: {
        getValue: () => 1,
        getName: () => 'ORGANIZATION',
        getPersianName: () => 'حقوقی',
    },
    // @ts-ignore
    getEnum: (val) => {
        let valEnum;
        Object.keys(INDIVIDUAL_TYPE).forEach(function (key, index) {
            // @ts-ignore
            if (INDIVIDUAL_TYPE[key].getName && val === INDIVIDUAL_TYPE[key].getName()) {
                console.log(key);
                // @ts-ignore
                console.log(INDIVIDUAL_TYPE[key].getValue());
                valEnum = {
                    // @ts-ignore
                    getName: () => INDIVIDUAL_TYPE[key].getName(),
                    // @ts-ignore
                    getValue: () => INDIVIDUAL_TYPE[key].getValue(),
                    // @ts-ignore
                    getPersianName: () => INDIVIDUAL_TYPE[key].getPersianName(),
                };
            }
            valEnum = INDIVIDUAL_TYPE.PERSON;
        });
        return valEnum;
    },
    stream: () => {
        return { map: Object.entries(INDIVIDUAL_TYPE).map };
    },
};
