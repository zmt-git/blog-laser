// 请求成功model
export class SuccessModel {
  constructor(result: any = null) {
    return { code: 1, msg: 'ok', result }
  }
}

// 请求成功分页model
export class SuccessPageModel {
  constructor(result: any = null, current: number, pageSize: number, total: number) {
    return { code: 1, msg: 'ok', result: { data: result, current, pageSize, total } }
  }
}

// 请求失败model
export class ErrorModel {
  constructor(msg = 'error', error: any = null) {
    return { code: 0, msg, error }
  }
}
