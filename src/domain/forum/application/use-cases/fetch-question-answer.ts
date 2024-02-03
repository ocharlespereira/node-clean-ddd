import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-respository'

interface FetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswerUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return {
      answers,
    }
  }
}