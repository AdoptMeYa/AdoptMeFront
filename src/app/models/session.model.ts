import { User } from "./user.model";
export class Session {
    public token: string;
    public user: User
}
export class SessionContainer {
    public ok: string;
    public message: string;
    public body: Session;
}