import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/option'
import { Slug } from './values-objects/slug'

interface QuestionProps {
  authoId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updateAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      createdAt: new Date()
    }, id)

    return question
  }
}