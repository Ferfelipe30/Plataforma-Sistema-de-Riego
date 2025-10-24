export interface ApiResponse<T> {
    data: T;
    detail: string;
    success: boolean;
}