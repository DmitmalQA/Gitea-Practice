import test, { expect } from "@playwright/test"
import testUserData from "../../test-data/users/testUser1.json"
import OrganisationService from "../../api/services/OrganisationService"
import { faker } from "@faker-js/faker"

test.describe('Repository API Tests', () => {
    let organisationService: OrganisationService
    
    test.beforeEach(({ request }) => {
        organisationService = new OrganisationService(request)
    })

    test.describe('Creating an organisation', () => {

        let orgName: string
        let orgEmail: string
        let orgDescription: string
        
        test.beforeEach(() => {
            orgName = faker.lorem.slug(2)
            orgEmail = faker.internet.email().toLowerCase()
            orgDescription = faker.lorem.sentences(3)
        })
        
        test('Create a public organisation', async () => {
            const response = await organisationService.createOrganisation(testUserData.userToken, orgName)
            const responseBody = await response.json()
            console.log(responseBody)
            expect(response.status()).toBe(201)
            expect(responseBody.name).toBe(orgName)
            expect(responseBody.visibility).toBe(`public`)
        })

        test('Create a limited organisation', async () => {
            const response = await organisationService.createOrganisation(testUserData.userToken, orgName, "limited")
            const responseBody = await response.json()
            expect(response.status()).toBe(201)
            expect(responseBody.name).toBe(orgName)
            expect(responseBody.visibility).toBe(`limited`)
        })

        test('Create a private organisation', async () => {
            const response = await organisationService.createOrganisation(testUserData.userToken, orgName, "private")
            const responseBody = await response.json()
            expect(response.status()).toBe(201)
            expect(responseBody.name).toBe(orgName)
            expect(responseBody.visibility).toBe(`private`)
        })

        test('Create a private organisation with connected email', async () => {
            const response = await organisationService.createOrganisation(testUserData.userToken, orgName, "private", orgEmail)
            const responseBody = await response.json()
            expect(response.status()).toBe(201)
            expect(responseBody.name).toBe(orgName)
            expect(responseBody.visibility).toBe(`private`)
            expect(responseBody.email).toBe(orgEmail)
        })

        test('Create a public organisation with connected email and allowed admin access', async () => {
            const response = await organisationService.createOrganisation(testUserData.userToken, orgName, "public", orgEmail, true)
            const responseBody = await response.json()
            expect(response.status()).toBe(201)
            expect(responseBody.name).toBe(orgName)
            expect(responseBody.visibility).toBe(`public`)
            expect(responseBody.repo_admin_change_team_access).toBe(true)
        })

        test('Create a limited organisation with connected email and description', async () => {
            const response = await organisationService.createOrganisation(testUserData.userToken, orgName, "limited", orgEmail, true, orgDescription)
            const responseBody = await response.json()
            expect(response.status()).toBe(201)
            expect(responseBody.name).toBe(orgName)
            expect(responseBody.visibility).toBe(`limited`)
            expect(responseBody.description).toBe(orgDescription)
        })

    })
})

test.afterAll(async ({ request }) => {
    const organisationService = new OrganisationService(request)

    const response = await request.get('api/v1/orgs', {
        headers: {
            'Authorization': `token ${testUserData.userToken}`
        }
    })

    const orgsList = await response.json()
    for(const org of orgsList){
        const orgName: string = org.name
        await organisationService.deleteOrganistaion(testUserData.userToken, orgName)
        expect(response.status()).toBe(200)
    }
})