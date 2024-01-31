import { QuestionsRepository } from '../repositories/question-respository';

interface EditQuestionseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

interface EditQuestionseCaseResponse { }

export class EditQuestionseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({ authorId, questionId, title, content }: EditQuestionseCaseRequest): Promise<EditQuestionseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {}
  }
}
