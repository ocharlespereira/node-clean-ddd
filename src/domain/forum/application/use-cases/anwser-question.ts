import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface AnwserQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
interface AnwserQuestionUseCaseResponse {
  answer: Answer
}

export class AnwserQuestionUseCase {
  constructor(private answersrepository: AnswersRepository) { }
  async execute({
    instructorId,
    questionId,
    content,
  }: AnwserQuestionUseCaseRequest): Promise<AnwserQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersrepository.create(answer)

    return {
      answer
    }
  }
}
