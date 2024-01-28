import { randomUUID } from 'node:crypto'
import { Slug } from './values-objects/slug'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authoId: string
}

export class Question {
  public id: string
  public title: string
  public slug: Slug
  public content: string
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title
    this.slug = props.slug
    this.content = props.content
    this.authorId = props.authoId
    this.id = id ?? randomUUID()
  }
}