export const telConverter = (formValues: { [x: string]: any; }) => {
    const telKeys = [
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

    const telList = telKeys
        .filter(({key}) => formValues[key])
        .map(({key, type}) => ({
            name: formValues[key],
            type,
        }));

    if (formValues.factoryTels && Array.isArray(formValues.factoryTels)) {
        const factoryTelObjects = formValues.factoryTels
            .filter((factoryTel) => factoryTel)
            .map((factoryTel) => ({
                name: factoryTel,
                type: 'FACTORY_TEL',
            }));
        telList.push(...factoryTelObjects);
    }
    if (formValues.factoryFaxes && Array.isArray(formValues.factoryFaxes)) {
        const factoryFaxObjects = formValues.factoryFaxes
            .filter((factoryFax) => factoryFax)
            .map((factoryFax) => ({
                name: factoryFax,
                type: 'FACTORY_FAX',
            }));
        telList.push(...factoryFaxObjects);
    }
    if (formValues.officeTels && Array.isArray(formValues.officeTels)) {
        const officeTelObjects = formValues.officeTels
            .filter((officeTel) => officeTel)
            .map((officeTel) => ({
                name: officeTel,
                type: 'OFFICE_TEL',
            }));
        telList.push(...officeTelObjects);
    }
    if (formValues.officeFaxes && Array.isArray(formValues.officeFaxes)) {
        const officeFaxObjects = formValues.officeFaxes
            .filter((officeFax) => officeFax)
            .map((officeFax) => ({
                name: officeFax,
                type: 'OFFICE_FAX',
            }));
        telList.push(...officeFaxObjects);
    }
    return telList
};
