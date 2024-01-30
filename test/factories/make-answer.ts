import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

/**
 * 
 * @param override aplicado ao Partial, deixa todos os parametros como opcionais e é possivel sobrescreve-los onde a funçao makeAnswer for chamada
 * Ex.: makeAnswer({ slug: Slug.create('example-answer')})
 * 
 */
export const makeAnswer = (override: Partial<AnswerProps> = {}, id?: UniqueEntityID) => {
  const answer = Answer.create({
    authorId: new UniqueEntityID(),
    questionId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return answer
}