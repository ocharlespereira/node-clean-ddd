import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-respository'
import { AnswerNotFoundError } from './errors/answer-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerUserCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUserCaseResponse = Either<
  AnswerNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUserCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUserCaseRequest): Promise<DeleteAnswerUserCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new AnswerNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}
