import { Either, left, right } from '@/core/either'
import { AnswerNotFoundError } from '@/core/errors/errors/answer-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { AnswersRepository } from '../repositories/answers-respository'

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
