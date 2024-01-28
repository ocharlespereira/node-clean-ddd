import { expect, test } from 'vitest'
import { AnwserQuestionUseCase } from './anwser-question'


test('create an answer', () => {
  const answerQuestion = new AnwserQuestionUseCase()

  const answer = answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})