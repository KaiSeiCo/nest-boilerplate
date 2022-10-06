export const HttpCodeMap = {
  20000: '请求成功',
  // 400
  40001: '未登录',
  40002: '参数校验失败',
  40003: '权限受限',
  41004: '不存在该用户',
  41005: '密码错误',
  // 500
  50000: '内部服务器异常',
  50001: '操作失败',
  50002: '参数格式不正确',
}

export type HttpCodeMapType = keyof typeof HttpCodeMap
