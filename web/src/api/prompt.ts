import { SERVER_URL } from '@/config'

export async function postPrompt(request: { prompt: string }): Promise<string> {
    const res = await fetch(`${SERVER_URL}/api/v1/modelai/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw new Error('internal server error')
    }

    return res.json()
}
