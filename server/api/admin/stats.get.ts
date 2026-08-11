import { getMessageStatus } from '~/types/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const messages = await getMessages()

  return {
    total: messages.length,
    unread: messages.filter(m => getMessageStatus(m) === 'unread').length,
    read: messages.filter(m => getMessageStatus(m) === 'read').length,
    draft: messages.filter(m => getMessageStatus(m) === 'draft').length,
    sent: messages.filter(m => getMessageStatus(m) === 'sent').length,
    fromWeb: messages.filter(m => (m.source || 'web') === 'web').length,
    fromEmail: messages.filter(m => m.source === 'email').length,
    outbound: messages.filter(m => m.source === 'outbound').length,
    recent: [...messages]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8),
  }
})
