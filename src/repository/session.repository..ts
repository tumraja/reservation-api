import { SessionModel } from "../model/session.model";
import { storageService } from "../services/storage/storage.service";
import { DBQueryBuilderInterface } from "../services/storage/storage.interface";

class SessionRepository {
    private storageService: DBQueryBuilderInterface;

    constructor() {
        this.storageService = storageService.getInstance;
    }

    public async create(session: SessionModel) {
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
