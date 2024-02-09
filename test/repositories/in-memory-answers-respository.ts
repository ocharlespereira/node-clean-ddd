import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-respository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  // dependecy inversion
  constructor(
    private answerAttachmentsRepository: AnswerAttachmentRepository
  ) {}

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => answerId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const itemIdex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIdex, 1)

    // dependecy inversion call
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
