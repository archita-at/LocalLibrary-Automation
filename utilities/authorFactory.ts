export function createAuthor() {
    const timestamp = Date.now();

    const date = new Date();
    date.setFullYear(date.getFullYear() - 10);

    return {
        firstName: `John${timestamp}`,
        lastName: `Doe${timestamp}`,
        dob: date.toLocaleDateString('en-CA'),
        date
    };
}