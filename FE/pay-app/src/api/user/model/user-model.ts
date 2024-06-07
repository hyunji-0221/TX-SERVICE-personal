export default interface UserModel {
    id?: number;
    type?: string;
    username?: string;
    password?: string;
    email?: string;
    name?: string;
    
    orders?: number;
}