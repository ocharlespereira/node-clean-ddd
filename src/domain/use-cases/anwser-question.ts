import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-respository'

interface AnwserQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnwserQuestionUseCase {
  constructor(private answersrepository: AnswersRepository) {

  }
  async execute({ instructorId, questionId, content }: AnwserQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    await this.answersrepository.create(answer)

    return answer
  }
}