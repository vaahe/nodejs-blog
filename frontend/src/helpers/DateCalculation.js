export const dateCalculation = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);

    const differenceInMilliseconds = date2 - date1;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    return { differenceInMilliseconds, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays };
}