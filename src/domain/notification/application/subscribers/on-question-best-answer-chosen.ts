import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/domain-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event'
import { SendNotificationUseCase } from '../use-case/send-notification'

export class OnQuestionBestaAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this), // quando a funçao for chamada o this tem q significar a mesma referencia da classe OnQuestionBestaAnswerChosen

      QuestionBestAnswerChosenEvent.name
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title}, foi escolhida pelo autor."`,
      })
    }
  }
}
