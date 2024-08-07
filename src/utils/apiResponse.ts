import { Response } from 'express';
interface ApiResponse<T> {
success: boolean;
message: string;
data?: T;
error?: string;
}
export const sendResponse = <T>(
res: Response,
statusCode: number,
success: boolean,
message: string,
data?: T,
error?: string
): void => {
const response: ApiResponse<T> = {
success,
message,
...(data !== undefined && { data }),
...(error !== undefined && { error })
};
res.status(statusCode).json(response);
};