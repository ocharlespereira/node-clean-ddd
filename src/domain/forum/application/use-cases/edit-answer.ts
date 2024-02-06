import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerNotFoundError } from '@/core/errors/errors/answer-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachement } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachementList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachmentRepository } from '../repositories/answer-attachments-respository'
import { AnswersRepository } from '../repositories/answers-respository'

interface EditAnswerseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerseCaseResponse = Either<
  AnswerNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentRepository: AnswerAttachmentRepository
  ) {}

  async execute({
    authorId,
    answerId,
    attachmentsIds,
    content,
  }: EditAnswerseCaseRequest): Promise<EditAnswerseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new AnswerNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    // busca todos os anexos que a pergunta ja tinha no BD
    const currentAnswerAttachments =
      await this.answerAttachmentRepository.findManyByAnswerId(answerId)

    // cria uma lista passando os anexos q ja tem
    const answerAttachmentList = new AnswerAttachementList(
      currentAnswerAttachments
    )

    // cria uma nova lista de anexos apartir dos anexos
    const answerAttachments = attachmentsIds.map((attachmentsIds) => {
      return AnswerAttachement.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        answerId: answer.id,
      })
    })

    // agora compara as listas e verifica qm fica e qm sai da lista
    answerAttachmentList.update(answerAttachments)

    // add uma nova lista a answer
    answer.content = content
    answer.attachments = answerAttachmentList

    // e por fim salva a nova lista no BD
    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
