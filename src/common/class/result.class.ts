export class Result<T> {
  readonly data: T
  readonly message: string
  readonly code: number

  constructor(data?: T, message?: string, code?: number) {
    this.data = data
    this.message = message
    this.code = code
  }

  static success<T>(data?: T) {
    return new Result<T>(data, 'success', 200)
  }
}
