export const handleError = (error: any, defaultMessage: string) => {
    console.error('Error:', error);
    return { message: defaultMessage };
};
