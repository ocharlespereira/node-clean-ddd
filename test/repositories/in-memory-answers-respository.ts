import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(id: string) {
    const answer = this.items.find(item => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items[itemIndex] = answer
  }


  async delete(answer: Answer) {
    const itemIdex = this.items.findIndex(item => item.id === answer.id)

    this.items.splice(itemIdex, 1)
  }

}