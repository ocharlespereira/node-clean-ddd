import { Answer } from '@/domain/entities/answer'
import { AnswersRepository } from '@/domain/repositories/answers-respository'
import { AnwserQuestionUseCase } from './anwser-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnwserQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
