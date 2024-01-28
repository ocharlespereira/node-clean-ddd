import { randomUUID } from 'node:crypto'

class Intructor {
  public id: string
  public name: string

  constructor(name: string, id?: string) {
    this.id = id ?? randomUUID()
    this.name = name
  }
}