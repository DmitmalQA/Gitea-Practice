import { test as base, Page } from "@playwright/test"

import RegisterPage from "../../pom/RegisterPage"
import DashboardPage from "../../pom/DashboardPage"
import NewOrganisationPage from "../../pom/NewOrganisationPage"
import NewRepositoryPage from "../../pom/NewRepositoryPage"
import LoginPage from "../../pom/LoginPage"

type App = {
    page: Page,
    registerPage: RegisterPage
    dashboardPage: DashboardPage
    newOrganisationPage: NewOrganisationPage
    newRepoPage: NewRepositoryPage
    loginPage: LoginPage
}

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            registerPage: new RegisterPage(page),
            dashboardPage: new DashboardPage(page),
            newOrganisationPage: new NewOrganisationPage(page),
            newRepoPage: new NewRepositoryPage(page),
            loginPage: new LoginPage(page)
        }
        await use(app)
    }
})

export { expect } from "@playwright/test"