import { QuestionsRepository } from '@/domain/forum/application/repositories/question-respository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string) {
    const question = this.items.find(item => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find(item => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    const itemIdex = this.items.findIndex(item => item.id === question.id)

    this.items.splice(itemIdex, 1)
  }

} 