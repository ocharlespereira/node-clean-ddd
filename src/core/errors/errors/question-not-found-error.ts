import { UseCaseError } from '@/core/errors/use-case-error'

export class QuestionNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Question not found')
  }
}
