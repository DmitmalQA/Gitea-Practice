import { faker } from "@faker-js/faker"

export function createRepositoryPayload(repoName: string){
    const payload: { name: string } = {
        name: repoName
    }
    return payload
}

export function createOrganisationPayload(orgName: string, visibility?: string, email?: string, adminAccess?: boolean, description?: string){
    const payload: { username: string, visibility?: string, email?: string, repo_admin_change_team_access?: boolean, description?: string} = {
        username: orgName,
        visibility: visibility,
        email: email,
        repo_admin_change_team_access: adminAccess,
        description: description
    }
    return payload
}