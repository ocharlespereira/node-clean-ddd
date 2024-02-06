import { UseCaseError } from '@/core/errors/use-case-error'

export class AnswerNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Answer not found')
  }
}
