import { AnswersRepository } from '../repositories/answers-respository';

interface EditAnswerseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerseCaseResponse { }

export class EditAnswerseCase {
  constructor(private answerRepository: AnswersRepository) { }

  async execute({ authorId, answerId, content }: EditAnswerseCaseRequest): Promise<EditAnswerseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {}
  }
}
