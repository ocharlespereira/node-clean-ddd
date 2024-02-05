import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-respository'
import { FetchQuestionAnswerUseCase } from './fetch-question-answer'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswerUseCase

describe('Fetch Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository
    )

    sut = new FetchQuestionAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch recent question answers ', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1'),
        })
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(2)
  })
})
