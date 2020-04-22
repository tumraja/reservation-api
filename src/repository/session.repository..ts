import { clientService } from './../services/database.service';
import { Session } from "../model/session";

class SessionRepository {
    public async create(session: Session) {
        const document = await clientService.db().collection('sessions').insertOne(session);
        console.log('created: ', document.ops);
        return !!document.ops[0];
    }

    public async get(sessionId: string) {
        if (!sessionId) {
            console.log('get: sessionId');
            const document = await clientService.db().collection('sessions')
                .find({_id: {$eq: sessionId}})
                .project({'userId': 1, '_id': 1});
            return document;
        }
    }

    public async destroy(sessionId: string) {
        console.log('destroy: ', sessionId);
        const collection = clientService.db().collection('sessions');
        const document = await collection.findOneAndDelete({_id: {$eq: sessionId}});
        return document;
    }
}

export const sessionRepository = new SessionRepository();
