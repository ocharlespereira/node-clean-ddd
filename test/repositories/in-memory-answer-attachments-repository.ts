import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-respository'
import { AnswerAttachement } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentRepository
{
  public items: AnswerAttachement[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId
    )

    this.items = answerAttachments
  }
}
