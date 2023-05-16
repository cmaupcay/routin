export const aujourdhui = () => {
    const date = new Date();
    return (new Date(
        date.getFullYear(), date.getMonth(), date.getDay())
    ).getTime();
};