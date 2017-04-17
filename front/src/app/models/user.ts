export class User{
    email:string;
    password:string;
    admin:boolean;
    constructor(email:string, pw:string, adm:boolean)
    {
        this.email = email;
        this.password = pw;
        this.admin = adm;
    }
}