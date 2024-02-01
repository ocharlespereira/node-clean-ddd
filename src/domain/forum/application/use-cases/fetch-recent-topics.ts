import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/question-respository';

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return {
      questions
    }
  }
}
