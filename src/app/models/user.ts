export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    motivation: string;
    access: boolean;
    full_access: boolean;
    //Propriété front
    password2: string;
}
