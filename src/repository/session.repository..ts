import { Session } from "../model/session";
import { storageService } from "../services/storage/storage.service";

class SessionRepository {
    private storageService;

    constructor() {
        this.storageService = storageService.instance;
    }

    public create(session: Session) {
        this.initCollection();
        const document = this.storageService.create(session);
        return !!document.ops[0];
    }

    public get(sessionId: string) {
        if (!sessionId) {
            this.initCollection();
            return this.storageService.findById(sessionId, {'userId': 1, '_id': 1});
        }
    }

    public async destroy(sessionId: string) {
        this.initCollection();
        return this.storageService.destroy(sessionId);
    }

    private initCollection() {
        this.storageService.setCollection('sessions');
    }
}

export const sessionRepository = new SessionRepository();
