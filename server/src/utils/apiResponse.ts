type ErrorItem = {
  path: string;
  message: string;
};

export default class ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown> | null;
  errors?: ErrorItem[] | null;

  constructor(
    success = true,
    message = '',
    data: Record<string, unknown> | null = null,
    errors: ErrorItem[] | null = null
  ) {
    this.success = success;
    this.message = message;

    if (data !== null) {
      this.data = data;
    }

    if (errors !== null) {
      this.errors = errors;
    }
  }
}
