export interface ApiResponse<TData> {
    success: boolean;
    status: number;
    message: string;
    data: TData;
}