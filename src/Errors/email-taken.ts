export class EmailTaken extends Error {
    private errorMessage: string = 'The email address you have entered is already taken';
    constructor(message?: string) {
        super(message);
        this.name = 'EmailTaken';
    }
}
