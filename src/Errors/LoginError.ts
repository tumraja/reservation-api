export class LoginError extends Error {
    private errorMessage: string = 'Check your email and password or create an account';
    public constructor(message?: string) {
        super(message);
        this.name = 'LoginError';
    }
}
