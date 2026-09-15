export const UUID = (str) => str;
export const FolderID = (id) => id;
export const ISODateString = (date) => {
    const ISODateRegex = /\d{4}-\d\d-\d\d(T\d\d:\d\d:\d\d(\.\d{3})?)?/;
    if (!ISODateRegex.test(date)) {
        throw new Error(`${date} is not an ISO date`);
    }
    return date;
};
