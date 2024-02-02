import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-respository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    )
  })

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comment test",
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "Comment test"
    )
  })
})
