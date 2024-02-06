import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { QuestionNotFoundError } from '@/core/errors/errors/question-not-found-error'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-respository'

interface DeleteQuestionseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionseCaseResponse = Either<
  QuestionNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class DeleteQuestionseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionseCaseRequest): Promise<DeleteQuestionseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new QuestionNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right({ question })
  }
}
