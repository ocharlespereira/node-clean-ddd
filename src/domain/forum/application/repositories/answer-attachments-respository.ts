import { AnswerAttachement } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachement[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
