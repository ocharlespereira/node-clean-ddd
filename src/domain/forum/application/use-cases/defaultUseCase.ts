
interface DefaultUseCaseRequest {

}

interface DefaultUseCaseResponse {

}

export class DefaultUseCase {
  constructor(private answersrepository: AnswersRepository) { }

  async execute({ }: DefaultUseCaseRequest): Promise<DefaultUseCaseResponse> { }
}
