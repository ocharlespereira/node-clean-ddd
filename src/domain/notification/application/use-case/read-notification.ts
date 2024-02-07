import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResouceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationtId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResouceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationtId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(
      notificationtId
    )

    if (!notification) {
      return left(new ResouceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({
      notification,
    })
  }
}
