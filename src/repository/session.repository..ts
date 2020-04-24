import { Session } from "../model/session";
import { StorageService } from "../services/storage/storage.service";
import { DatabaseStorage } from "../services/storage/datatabase.storage";

class SessionRepository {
    private storageService: StorageService;

    constructor() {
        this.storageService = new StorageService(new DatabaseStorage('sessions'));
        this.storageService.connect();
    }

    public create(session: Session) {
        const document = this.storageService.instance.create(session);
        return !!document.ops[0];
    }

    public get(sessionId: string) {
        if (!sessionId) {
            return this.storageService.instance.findById(sessionId);
        }
    }

    public async destroy(sessionId: string) {
        return this.storageService.instance.destroy(sessionId);
    }
}

export const sessionRepository = new SessionRepository();
