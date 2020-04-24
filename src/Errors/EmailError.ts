export class EmailError extends Error {
    private errorMessage: string = 'Please check your email address again';
    constructor(message?: string) {
        super(message);
        this.name = 'EmailError';
    }
}
