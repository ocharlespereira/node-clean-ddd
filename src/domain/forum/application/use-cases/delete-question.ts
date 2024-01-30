import { QuestionsRepository } from '../repositories/question-respository';

interface DeleteQuestionseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionseCaseResponse { }

export class DeleteQuestionseCase {
  constructor(private questionrepository: QuestionsRepository) { }

  async execute({ authorId, questionId }: DeleteQuestionseCaseRequest): Promise<DeleteQuestionseCaseResponse> {
    const question = await this.questionrepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionrepository.delete(question)

    return {}
  }
}
