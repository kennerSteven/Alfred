export class ApiError extends Error {
  public statusCode: number;
  public errors?: any;

  constructor(statusCode: number, message: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string, errors?: any) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message: string = 'No autorizado') {
    return new ApiError(401, message);
  }

  static forbidden(message: string = 'Acceso denegado: permisos insuficientes') {
    return new ApiError(403, message);
  }

  static notFound(message: string = 'Recurso no encontrado') {
    return new ApiError(404, message);
  }

  static conflict(message: string, errors?: any) {
    return new ApiError(409, message, errors);
  }

  static internal(message: string = 'Error interno del servidor') {
    return new ApiError(500, message);
  }
}
