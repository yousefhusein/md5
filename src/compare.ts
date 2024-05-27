import { hash } from "./hash"

export function compare(plainTextPassword: string, hashedPassword: string): boolean {
  return hash(plainTextPassword) === hashedPassword
}
