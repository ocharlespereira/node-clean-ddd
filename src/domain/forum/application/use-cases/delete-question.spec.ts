import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-respository'
import { DeleteQuestionseCase } from './delete-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)
    console.log('inMemoryQuestionRepository :', inMemoryQuestionRepository.items);

    await sut.execute({
      questionId: 'question-1'
    })

    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

})
