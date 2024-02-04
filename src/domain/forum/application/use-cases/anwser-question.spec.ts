import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-respository'
import { AnwserQuestionUseCase } from './anwser-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnwserQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnwserQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Answer content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
  })
})
