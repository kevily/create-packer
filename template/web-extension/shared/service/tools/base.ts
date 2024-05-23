import { includes } from 'lodash-es'
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
    if (!includes(['GET', 'HEAD'], req.method)) {
        const dataTypes = ['json', 'blob', 'text', 'formData'] as const
        for (let i = 0; i < dataTypes.length; i++) {
            try {
                const dataType = dataTypes[i]
                reqBody = await req.clone()[dataType]()
            } catch {
                /* empty */
            }
            if (reqBody) {
                break
            }
        }
    }
    return reqBody
}

export async function pickResponseBody<Body = any>(res: Response): Promise<Body | undefined> {
    let body = void 0
    try {
        body = await res.clone().json()
    } catch {
        /** empty */
    }
    return body
}
