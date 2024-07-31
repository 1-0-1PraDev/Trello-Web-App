export interface IUser{
    firstname: string,
    email: string;
    password: string,
    token?: string,
    avatar: {
        public_id: string;
        url: string;
    }
}
        
