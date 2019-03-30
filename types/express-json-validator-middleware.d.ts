export class ValidationError {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(validationErrors: any);
  name: any;
  validationErrors: any;
}
export class Validator {
  constructor(ajvOptions: any);
  ajv: any;
  validate(options: any): any;
}
