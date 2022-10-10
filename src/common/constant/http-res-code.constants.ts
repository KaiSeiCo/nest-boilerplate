export const HttpCodeMap = {
  20000: '请求成功',
  // 400
  40001: '未登录',
  40002: '参数校验失败',
  40003: '权限受限',
  41004: '不存在该用户',
  41005: '密码错误',
  41006: '用户名已经被注册',
  // 500
  50000: '内部服务器异常',
  50001: '操作失败',
  50002: '参数格式不正确',
}

export type HttpCodeMapType = keyof typeof HttpCodeMap

export const CustomHttpCode: Record<
  string,
  { code: HttpCodeMapType; message: string }
> = {
  SUCCESS: {
    code: 20000,
    message: '请求成功',
  },
  NOT_LOGIN: {
    code: 40001,
    message: '未登录',
  },
  PARAMETER_INVALID: {
    code: 40002,
    message: '参数校验失败',
  },
  UNAUTHORIZED: {
    code: 40003,
    message: '未授权',
  },
  USER_NOT_EXISTS: {
    code: 41004,
    message: '用户不存在',
  },
  WRONG_PASSWORD: {
    code: 41005,
    message: '密码错误',
  },
  USER_ALREADY_EXISTS: {
    code: 41006,
    message: '用户名已被注册',
  },
  INTERNAL_SERVER_ERROR: {
    code: 50000,
    message: '内部服务器异常',
  },
  OPERATION_FAILED: {
    code: 50001,
    message: '操作失败',
  },
  INVALID_PARAMETER_FORMAT: {
    code: 50002,
    message: '参数格式不正确',
  },
}
