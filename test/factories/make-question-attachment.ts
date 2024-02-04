import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachement,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'

export const makeQuestionAttachment = (
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID
) => {
  const questionattachment = QuestionAttachement.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id
  )

  return questionattachment
}
