import { expect, test } from 'vitest'
import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-respository'
import { AnwserQuestionUseCase } from './anwser-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  }
}


test('create an answer', async () => {
  const answerQuestion = new AnwserQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})