import { httpBodyType } from '../types'

export class FetchError extends Error {
    public request: Request

    constructor(request: Request) {
        super()
        this.name = 'FetchError'
        this.request = request
    }
}

export async function pickRequestBody<Body = httpBodyType>(
    req: Request
): Promise<Body | undefined> {
    let reqBody = void 0
    try {
        reqBody = await req.clone().json()
    } catch {
        /* empty */
    }
    return reqBody
}

export async function pickReponseBody<Body = any>(res: Response): Promise<Body | undefined> {
    let body = void 0
    try {
        body = await res.clone().json()
    } catch {
        /** empty */
    }
    return body
}
