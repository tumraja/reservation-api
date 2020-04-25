import { Session } from "../model/session";
import { storageService } from "../services/storage/storage.service";
import { DBInterface } from "../services/storage/storage.interface";

class SessionRepository {
    private storageService: DBInterface;

    constructor() {
        this.storageService = storageService.instance;
    }

    public async create(session: Session) {
        const document = await this.storageService.create(session, 'session');
        return document;
    }

    public get(sessionId: string) {
        if (!sessionId) {
            return this.storageService.selectById(sessionId, 'session', {'userId': 1, '_id': 1});
        }
    }

    public async destroy(sessionId: string) {
        return this.storageService.destroy(sessionId, 'session');
    }
}

export const sessionRepository = new SessionRepository();
