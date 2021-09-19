export class User {
    public id: number;
    public username: string;
    public password: string;
    /*
    public rol: string;
    public email: string;
    public petSupplierLocation: string;
    public dni: string;
    public ruc: string;
    public phone: string;
    */
}
export class UserContainer {
    public ok: string;
    public message: string;
    public body: User[];
}