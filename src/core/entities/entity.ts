import { randomUUID } from 'node:crypto'

export class Entity<P> {
  private _id: string

  protected props: P

  //com get nao pode ser alterado uma entidade(accessor), forma para apenas acessa-lo
  get id() {
    return this._id
  }

  constructor(props: P, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}
