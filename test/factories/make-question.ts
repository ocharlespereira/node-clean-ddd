import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities/question'

/**
 * 
 * @param override aplicado ao Partial, deixa todos os parametros como opcionais e é possivel sobrescreve-los onde a funçao makeQuestion for chamada
 * Ex.: makeQuestion({ slug: Slug.create('example-question')})
 * 
 */
export const makeQuestion = (override: Partial<QuestionProps> = {}) => {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Example question',
    content: 'Exemple content',
    ...override
  })

  return question
}