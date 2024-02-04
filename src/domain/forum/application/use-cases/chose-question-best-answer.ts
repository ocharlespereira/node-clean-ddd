import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-respository'
import { AnswerNotFoundError } from './errors/answer-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { QuestionNotFoundError } from './errors/question-not-found-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  AnswerNotFoundError | QuestionNotFoundError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answersrepository: AnswersRepository
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersrepository.findById(answerId)

    if (!answer) {
      return left(new AnswerNotFoundError())
    }
    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    )

    if (!question) {
      return left(new QuestionNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
