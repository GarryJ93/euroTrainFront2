export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    motivation: string;
    access: boolean;
    full_access: boolean;
    delete_at: Date;
    //Propriété front
    password2: string;
}
