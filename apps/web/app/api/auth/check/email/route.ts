// app/api/auth/check/email/route.ts
import { createDuplicateCheckHandler } from '../../../../../shared/lib/validators/createDuplicateCheckHandler';
import { checkEmailDuplicate } from '../../../../../shared/lib/validators/duplicateCheck';

export const POST = createDuplicateCheckHandler(checkEmailDuplicate, '이메일');
