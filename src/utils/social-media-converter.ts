export const socialMediaConverter = (formValues: { [x: string]: any; }) => {
    const socialMediaKeys = [
        { key: 'telegramPhoneNo', type: 'TELEGRAM' },
        { key: 'telegramId', type: 'TELEGRAM' },
        { key: 'whatsAppPhoneNo', type: 'WHATSAPP' },
        { key: 'whatsAppId', type: 'WHATSAPP' },
        { key: 'instagramId', type: 'INSTAGRAM' },
        { key: 'linkedInId', type: 'LINKEDIN' },
        { key: 'skypeId', type: 'SKYPE' },
        { key: 'eitaaPhoneNo', type: 'EITAA' },
        { key: 'rubikaPhoneNo', type: 'RUBIKA' },
        { key: 'website', type: 'WEBSITE' },
    ];

    const socialMediaList = socialMediaKeys
        .filter(({key}) => formValues[key])
        .map(({key, type}) => ({
            name: formValues[key],
            type,
        }));

    if (formValues.emails && Array.isArray(formValues.emails)) {
        const emailObjects = formValues.emails
            .filter((email) => email)
            .map((email) => ({
                name: email,
                type: 'EMAIL',
            }));
        socialMediaList.push(...emailObjects);
    }
    return socialMediaList
};

// const formValues = {
//     telegramPhoneNo: '09123456789',
//     telegramId: 'foodkeys',
//     whatsAppPhoneNo: '09123456788',
//     whatsAppId: 'arminm4',
//     instagramId: 'foodkeys@',
//     linkedInId: 'foodkeys',
//     skypeId: 'foodkeys',
//     eitaaPhoneNo: '',
//     rubikaPhoneNo: '09123456787',
//     website: 'https://www.foodkeys.com',
// };
//
// const socialMediaObjects = formDataToSocialMediaObjects(formValues);