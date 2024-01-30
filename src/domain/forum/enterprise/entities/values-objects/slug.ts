export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalize it as slug
   *
   * Example: "An Exemple title" => "an-example-title"
   *
   *
   * @param text {string}
   *
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD') // remove qualquer tipo de acentuaçao da string
      .toLowerCase() // caixa baixa
      .trim() // retira espaçamento inicio e fim
      .replace(/\s+/g, '-') // substitui os espaços em branco por traço
      .replace(/[^\w-]+/g, '') // retira simbolos
      .replace(/_/g, '-') // substitui _ por -
      .replace(/--+/g, '-') // substitui dois hifens(--) por um (-)
      .replace(/-$/g, '') // no final tiver hifem, substitui por nada

    return new Slug(slugText)
  }
}
