import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/question-respository'
import { NotAllowedError } from './errors/not-allowed-error'
import { QuestionNotFoundError } from './errors/question-not-found-error'

interface EditQuestionseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

type EditQuestionseCaseResponse = Either<
  QuestionNotFoundError | NotAllowedError,
  {}
>

export class EditQuestionseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionseCaseRequest): Promise<EditQuestionseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new QuestionNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right({})
  }
}
