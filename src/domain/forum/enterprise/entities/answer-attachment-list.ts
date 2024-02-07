import { WatchedList } from '@/core/entities/watched-list'
import { AnswerAttachement } from './answer-attachment'

export class AnswerAttachementList extends WatchedList<AnswerAttachement> {
  compareItems(a: AnswerAttachement, b: AnswerAttachement): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
