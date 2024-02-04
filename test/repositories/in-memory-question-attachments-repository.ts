import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-respository'
import { QuestionAttachement } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentRepository
{
  public items: QuestionAttachement[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter((item) => questionId)

    return questionAttachments
  }
}
