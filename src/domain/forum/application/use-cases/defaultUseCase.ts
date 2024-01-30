
interface DefaultUseCaseRequest {

}

interface DefaultUseCaseResponse {

}

export class DefaultUseCase {
  constructor(private defaultrepository: DefaultRepository) { }

  async execute({ }: DefaultUseCaseRequest): Promise<DefaultUseCaseResponse> { }
}
