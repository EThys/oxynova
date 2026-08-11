import { c as defineEventHandler, g as getRouterParam, e as createError, k as getMessageById, l as deleteMessage } from '../../../../_/nitro.mjs';
import { r as requireAdmin } from '../../../../_/auth.mjs';
import { i as isImapConfigured, d as deleteRemoteEmail } from '../../../../_/imap.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:fs/promises';
import 'node:url';
import 'imapflow';
import 'mailparser';
import '../../../../_/attachments.mjs';
import '../../../../_/sanitizeHtml.mjs';

const _id__delete = defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID manquant." });
  const msg = await getMessageById(id);
  if (!msg) throw createError({ statusCode: 404, statusMessage: "Message introuvable." });
  let remoteDeleted = false;
  let remoteSkipped = false;
  let remoteError;
  if (msg.source === "email") {
    if (!isImapConfigured()) {
      remoteSkipped = true;
      remoteError = "IMAP non configur\xE9 \u2014 suppression locale uniquement";
    } else if (!msg.imapUid && !msg.emailMessageId) {
      remoteSkipped = true;
      remoteError = "Identifiant IMAP manquant \u2014 suppression locale uniquement";
    } else {
      const remote = await deleteRemoteEmail({
        imapUid: msg.imapUid,
        emailMessageId: msg.emailMessageId,
        mailbox: msg.imapMailbox
      });
      if (remote.deleted) {
        remoteDeleted = true;
      } else if (remote.notFound) {
        remoteSkipped = true;
      } else {
        throw createError({
          statusCode: 502,
          statusMessage: `Suppression Hostinger \xE9chou\xE9e : ${remote.error || "erreur inconnue"}. Le message n\u2019a pas \xE9t\xE9 supprim\xE9 localement.`
        });
      }
    }
  } else {
    remoteSkipped = true;
  }
  const deleted = await deleteMessage(id);
  if (!deleted) throw createError({ statusCode: 404, statusMessage: "Message introuvable." });
  return {
    success: true,
    remoteDeleted,
    remoteSkipped,
    remoteError
  };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
