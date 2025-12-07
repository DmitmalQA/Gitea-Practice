import { test, expect } from "../../utils/fixtures/app.ts"
import { faker } from "@faker-js/faker"
import { saveUserData } from './userData'

/*test("Save Mitchell Rau Storage state", async({ page }) => {
    await page.goto('http://localhost:3000/user/login')
    await page.locator('#user_name').fill(UserData.USERNAME)
    await page.locator('#password').fill(UserData.PASSWORD)
    await page.locator('button:has-text("Sign In")').click()
    await expect(page.locator('[aria-label="Mitchell Rau - Dashboard')).toBeVisible()
    await page.context().storageState({path: '.states/Mitchell_Rau.json'})
})*/

test('Register testUser1 and save storage state', async({ app }) => {
    const randomUserName = faker.internet.username()
    const randomEmail = `dmitmal+${Date.now()}@qamadness.com`
    const password = faker.internet.password({ length: 10 })

    await app.registerPage.navigateTo()
    await app.registerPage.register(randomUserName, randomEmail, password, password)
    await expect(app.dashboardPage.navBarUserName).toHaveText(randomUserName)
    await app.page.context().storageState({ path: '.states/testUser1.json'})

    await app.page.locator('div[data-tooltip-content="Profile and Settings…"]').click()
    await app.page.locator('[href="/user/settings"]').click()
    await app.page.locator('[href="/user/settings/applications"]').click()
    await app.page.locator('#name').fill('API-Auto-Token')
    const checkboxes = app.page.locator('[value*="write"]')
    for (const checkbox of await checkboxes.all()){
        await checkbox.check()
    }
    await app.page.locator('button:has-text("Generate token")').click()
    const token = await app.page.locator("div.info.message p").innerText()

    saveUserData({
        userName: randomUserName,
        userEmail: randomEmail,
        userPassword: password,
        userToken: token
    }, './test-data/users/testUser1.json')
})