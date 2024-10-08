import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<P> {
  private _id: UniqueEntityID

  protected props: P

  // com get nao pode ser alterado uma entidade(accessor), forma para apenas acessa-lo
  get id() {
    return this._id
  }

  protected constructor(props: P, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity._id === this._id) {
      return true
    }

    return false
  }
}
