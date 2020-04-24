export class EmailError extends Error {
    public message: string = 'Please check your email address again';

    constructor(message?: string) {
        super(message);
        this.name = 'EmailError';
    }
}
