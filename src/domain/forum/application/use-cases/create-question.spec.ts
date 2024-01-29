import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-respository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => { },
}

test('create a new question', async () => {
  const sut = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await sut.execute({
    authorId: '1',
    title: 'New question',
    content: 'Question content'
  })

  expect(question.id).toBeTruthy()
})
