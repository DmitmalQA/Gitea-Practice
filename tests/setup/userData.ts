import { promises as fs } from 'fs'
import path from 'path'

export type SavedUser = {
  userName: string
  userEmail?: string
  userPassword: string
  userToken: string
}

export async function saveUserData(user: SavedUser, relativeFilePath: string): Promise<string> {
  const fullPath = path.resolve(relativeFilePath)
  const dir = path.dirname(fullPath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(fullPath, JSON.stringify(user, null, 2), 'utf8')
  return fullPath
}

export async function loadUserData(relativeFilePath: string): Promise<SavedUser> {
  const fullPath = path.resolve(relativeFilePath)
  const raw = await fs.readFile(fullPath, 'utf8')
  return JSON.parse(raw) as SavedUser
}
