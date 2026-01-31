export interface MoodleUpdateResponse {
  success: boolean;
  message?: string;
  userId?: number;
  warnings?: any[];
  error?: {
    errorcode?: string;
    message?: string;
  };
}
