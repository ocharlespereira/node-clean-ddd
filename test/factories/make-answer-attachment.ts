import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachement,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export const makeAnswerAttachment = (
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID
) => {
  const answerattachment = AnswerAttachement.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id
  )

  return answerattachment
}
