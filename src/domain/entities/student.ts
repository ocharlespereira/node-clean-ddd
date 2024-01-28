import { randomUUID } from 'node:crypto'

export class Student {
  id: string
  public name: string

  constructor(name: string, id?: string) {
    this.id = randomUUID()
    this.name = name
  }
}