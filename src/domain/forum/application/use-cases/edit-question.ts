import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { QuestionNotFoundError } from '@/core/errors/errors/question-not-found-error'
import { QuestionAttachement } from '../../enterprise/entities/question-attachment'
import { QuestionAttachementList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachmentRepository } from '../repositories/question-attachments-respository'
import { QuestionsRepository } from '../repositories/question-respository'

interface EditQuestionseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
  attachmentsIds: string[]
}

type EditQuestionseCaseResponse = Either<
  QuestionNotFoundError | NotAllowedError,
  {}
>

export class EditQuestionseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionseCaseRequest): Promise<EditQuestionseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new QuestionNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    // busca todos os anexos que a pergunta ja tinha no BD
    const currentQuestionAttachments =
      await this.questionAttachmentRepository.findManyByQuestionId(questionId)

    // cria uma lista passando os anexos q ja tem
    const questionAttachmentList = new QuestionAttachementList(
      currentQuestionAttachments
    )

    // cria uma nova lista de anexos apartir dos anexos
    const questionAttachments = attachmentsIds.map((attachmentsIds) => {
      return QuestionAttachement.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        questionId: question.id,
      })
    })

    // agora compara as listas e verifica qm fica e qm sai da lista
    questionAttachmentList.update(questionAttachments)

    // add uma nova lista a question
    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    // e por fim salva a nova lista no BD
    await this.questionRepository.save(question)

    return right({})
  }
}
