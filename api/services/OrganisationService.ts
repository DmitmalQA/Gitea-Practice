import { APIRequestContext } from "@playwright/test"
import { createOrganisationPayload } from "../payloads/repository/create"

export default class RepositoryService {

    private request: APIRequestContext
    
    constructor(request: APIRequestContext){
        this.request = request
    }

    async createOrganisation(token: string, orgName: string, visibility?: string, email?: string, adminAccess?: boolean, description?: string){
        const payload = createOrganisationPayload(orgName, visibility, email, adminAccess, description)

        return await this.request.post('/api/v1/orgs', {
                data: payload,
                headers: {
                    'Authorization': `token ${token}`
                }
        })
    }

    async deleteOrganistaion(token: string, orgName: string){
        return await this.request.delete(`/api/v1/orgs/${orgName}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}