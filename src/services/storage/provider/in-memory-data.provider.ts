import { OPERATORS, SESSIONS, TOURS, USERS } from "../../../../commands/data/data";

export function document(name) {
    const docMapper = {
        'users': USERS,
        'tours': TOURS,
        'operators': OPERATORS,
        'sessions': SESSIONS
    };

    return docMapper[name];
}
