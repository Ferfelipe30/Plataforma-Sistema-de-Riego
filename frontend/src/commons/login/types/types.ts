export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
}

export interface LoginResponse {
    user: User;
    token: string;
    message?: string;
}