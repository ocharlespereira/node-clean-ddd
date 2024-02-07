import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

/**
 *
 * @param override aplicado ao Partial, deixa todos os parametros como opcionais e é possivel sobrescreve-los onde a funçao makeNotification for chamada
 * Ex.: makeNotification({ slug: Slug.create('example-notification')})
 *
 */
export const makeNotification = (
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID
) => {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id
  )

  return notification
}
