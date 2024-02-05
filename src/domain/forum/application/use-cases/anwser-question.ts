import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerAttachement } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachementList } from '../../enterprise/entities/answer-attachment-list'

interface AnwserQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnwserQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnwserQuestionUseCase {
  constructor(private answersrepository: AnswersRepository) {}
  async execute({
    instructorId,
    questionId,
    attachmentsIds,
    content,
  }: AnwserQuestionUseCaseRequest): Promise<AnwserQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersrepository.create(answer)

    const answerAttachments = attachmentsIds.map((attachmentsIds) => {
      return AnswerAttachement.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        answerId: answer.id,
      })
    })

    // info vindo do Question.set.attachments para criar os Ids
    answer.attachments = new AnswerAttachementList(answerAttachments)

    return right({
      answer,
    })
  }
}
