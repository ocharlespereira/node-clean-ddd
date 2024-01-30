import { QuestionsRepository } from '@/domain/forum/application/repositories/question-respository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

}