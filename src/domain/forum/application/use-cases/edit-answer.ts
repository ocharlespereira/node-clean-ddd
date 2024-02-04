import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-respository'
import { AnswerNotFoundError } from './errors/answer-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditAnswerseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerseCaseResponse = Either<
  AnswerNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerseCaseRequest): Promise<EditAnswerseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new AnswerNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
