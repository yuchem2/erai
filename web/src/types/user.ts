export interface IPostUserdataRequest {
    body: {
        user_url: string
    }
}

export interface IPostUserdataResponse {
    data: string[]
}
