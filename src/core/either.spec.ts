import { Either, left, right } from './either'

const doSomethig = (shoudSuccess: boolean): Either<string, string> => {
  if (shoudSuccess) {
    return right('success')
  }
  return left('error')
}

test('success result', () => {
  const result = doSomethig(true)

  if (result.isRight()) {
    console.log('sult.isRight() :', result.value)
  }

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const result = left(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})
