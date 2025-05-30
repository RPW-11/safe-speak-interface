export type User = {
    id: string
    username: string;
    email: string;
    img_url?: string
    createdAt: string;
    updatedAt: string;

}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterCredentials = {
    username: string;
    email: string;
    password: string;
}