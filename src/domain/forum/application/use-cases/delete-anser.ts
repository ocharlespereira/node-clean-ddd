import { AnswersRepository } from '../repositories/answers-respository'


interface DeleteAnswereCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswereCaseResponse { }

export class DeleteAnswereCase {
  constructor(private answerRepository: AnswersRepository) { }

  async execute({ authorId, answerId }: DeleteAnswereCaseRequest): Promise<DeleteAnswereCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}
