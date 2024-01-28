import { Answer } from '../entities/answer'

interface AnwserQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnwserQuestionUseCase {
  execute({ instructorId, questionId, content }: AnwserQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    return answer
  }
}