import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-respository'
import { EditQuestionseCase } from './edit-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'Answer test',
      content: 'Content test'
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Answer test',
      content: 'Content test',
    });
  })

  it('should be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'author-2',
        title: 'Answer test',
        content: 'Content test'
      })
    }).rejects.toBeInstanceOf(Error)
  })

})
