import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities/question'
import { faker } from '@faker-js/faker'

/**
 * 
 * @param override aplicado ao Partial, deixa todos os parametros como opcionais e é possivel sobrescreve-los onde a funçao makeQuestion for chamada
 * Ex.: makeQuestion({ slug: Slug.create('example-question')})
 * 
 */
export const makeQuestion = (override: Partial<QuestionProps> = {}, id?: UniqueEntityID) => {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return question
}