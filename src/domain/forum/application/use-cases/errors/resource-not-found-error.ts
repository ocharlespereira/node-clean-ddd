import { UseCaseError } from '@/core/errors/use-case-error'

export class ResouceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
