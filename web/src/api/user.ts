import { IPostUserdataRequest, IPostUserdataResponse } from '@/types/user'
import { SERVER_URL } from '@/config'

export async function postUserdata(request: IPostUserdataRequest): Promise<IPostUserdataResponse> {
    const res = await fetch(`${SERVER_URL}/api/v1/userdata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('internal server error')
    }
    return res.json()
}
