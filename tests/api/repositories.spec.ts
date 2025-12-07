import test, { expect } from "@playwright/test"
import testUserData from "../../test-data/users/testUser1.json"
import RepositoryService from "../../api/services/RepositoryService"
import { faker } from "@faker-js/faker"

test.describe('Repository API Tests', () => {
    let repositoryService: RepositoryService
    
    test.beforeEach(({ request }) => {
        repositoryService = new RepositoryService(request)
    })

    test.describe('Creating a repository', () => {
        
        test('Create a basic repository', async () => {
            const repoName = faker.lorem.slug(2)
            console.log(testUserData.userToken)
            const response = await repositoryService.createRepository(testUserData.userToken, repoName)
            const responseBody = await response.json()
            expect(response.status()).toBe(201)
            expect(responseBody.name).toBe(repoName)
            expect(responseBody.full_name).toBe(`${testUserData.userName}/${repoName}`)
        })
    })
})

test.afterAll(async ({ request }) => {
    const repositoryService = new RepositoryService(request)

    const response = await request.get('api/v1/user/repos', {
        headers: {
            'Authorization': `token ${testUserData.userToken}`
        }
    })

    const reposList = await response.json()
    for(const repo of reposList){
        const repoName: string = repo.name
        const owner: string = repo.owner.login
        await repositoryService.deleteRepository(testUserData.userToken, owner, repoName)
        expect(response.status()).toBe(200)
    }
})