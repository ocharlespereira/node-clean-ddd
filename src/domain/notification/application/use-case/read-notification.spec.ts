import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResouceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification({})

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationtId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    )
  })

  it('should be able to read a notification resource not found', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: '',
      notificationtId: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResouceNotFoundError)
  })

  it('should be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: 'recipient-2',
      notificationtId: notification.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })
})
