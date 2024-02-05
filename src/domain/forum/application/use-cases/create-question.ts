import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionAttachement } from '../../enterprise/entities/question-attachment'
import { QuestionAttachementList } from '../../enterprise/entities/question-attachment-list'
import { QuestionsRepository } from '../repositories/question-respository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionrepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentsIds) => {
      return QuestionAttachement.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        questionId: question.id,
      })
    })

    // info vindo do Question.set.attachments para criar os Ids
    question.attachments = new QuestionAttachementList(questionAttachments)

    await this.questionrepository.create(question)

    return right({
      question,
    })
  }
}
