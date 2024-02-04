import { QuestionAttachement } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachement[]>
}
