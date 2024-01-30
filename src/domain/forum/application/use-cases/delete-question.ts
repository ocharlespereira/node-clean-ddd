import { QuestionsRepository } from '../repositories/question-respository';

interface DeleteQuestionseCaseRequest {
  questionId: string
}

interface DeleteQuestionseCaseResponse { }

export class DeleteQuestionseCase {
  constructor(private questionrepository: QuestionsRepository) { }

  async execute({ questionId }: DeleteQuestionseCaseRequest): Promise<DeleteQuestionseCaseResponse> {
    const question = await this.questionrepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    await this.questionrepository.delete(question)

    return {}
  }
}
