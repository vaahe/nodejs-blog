export const dateConverter = (date) => {
    const newDate = new Date(date).toISOString().replace('T', ' ').replace('Z', ' ');
    return newDate;

}