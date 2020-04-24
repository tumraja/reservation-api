export class UserNotFoundError extends Error {
    private errorMessage: string = 'Sorry, we could not foind the user';
    public constructor(message?: string) {
        super(message);
        this.name = 'UserNotFoundError';
    }
}
