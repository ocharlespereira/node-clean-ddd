import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-respository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-topics'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 10) }))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 5) }))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 16) }))

    const { questions } = await sut.execute({
      page: 1
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 16) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 10) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 5) })
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2
    })

    expect(questions).toHaveLength(2)
  })

})
