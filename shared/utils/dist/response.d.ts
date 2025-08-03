import { ApiResponse, ServiceResponse } from '../../types/dist/index';
export declare class ResponseUtils {
    static success<T>(data?: T, message?: string): ApiResponse<T>;
    static error(message: string, error?: string): ApiResponse;
    static paginated<T>(data: T[], page: number, limit: number, total: number, message?: string): ApiResponse<T[]>;
    static serviceSuccess<T>(data?: T, message?: string, statusCode?: number): ServiceResponse<T>;
    static serviceError(message: string, error?: string, statusCode?: number): ServiceResponse;
}
//# sourceMappingURL=response.d.ts.map