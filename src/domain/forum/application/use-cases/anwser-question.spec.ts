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

    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Answer content'
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })

})
