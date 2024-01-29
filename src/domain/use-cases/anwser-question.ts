import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/entities/answer'
import { AnswersRepository } from '@/domain/repositories/answers-respository'

interface AnwserQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnwserQuestionUseCase {
  constructor(private answersrepository: AnswersRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
  }: AnwserQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersrepository.create(answer)

    return answer
  }
}
