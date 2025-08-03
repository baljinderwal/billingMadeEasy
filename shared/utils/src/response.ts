import { ApiResponse, ServiceResponse } from '@billing/types';

export class ResponseUtils {
  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    };
  }

  static error(message: string, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ): ApiResponse<T[]> {
    return {
      success: true,
      data,
      message,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static serviceSuccess<T>(data?: T, message?: string, statusCode: number = 200): ServiceResponse<T> {
    return {
      success: true,
      data,
      message,
      statusCode,
    };
  }

  static serviceError(message: string, error?: string, statusCode: number = 500): ServiceResponse {
    return {
      success: false,
      message,
      error,
      statusCode,
    };
  }
}
