import { APIRequestContext } from "@playwright/test"
import { createRepositoryPayload } from "../payloads/repository/create"

export default class RepositoryService {

    private request: APIRequestContext
    
    constructor(request: APIRequestContext){
        this.request = request
    }

    async createRepository(token: string, repoName: string){
        const payload = createRepositoryPayload(repoName)

        return await this.request.post('/api/v1/user/repos', {
                data: payload,
                headers: {
                    'Authorization': `token ${token}`
                }
        })
    }

    async deleteRepository(token: string, owner: string, repoName: string){
        return await this.request.delete(`/api/v1/repos/${owner}/${repoName}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

