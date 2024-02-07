import { WatchedList } from '@/core/entities/watched-list'
import { QuestionAttachement } from './question-attachment'

export class QuestionAttachementList extends WatchedList<QuestionAttachement> {
  compareItems(a: QuestionAttachement, b: QuestionAttachement): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
