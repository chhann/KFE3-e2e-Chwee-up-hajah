// app/api/auth/check/email/route.ts
import { createDuplicateCheckHandler } from '../../../../../lib/validators/createDuplicateCheckHandler';
import { checkEmailDuplicate } from '../../../../../lib/validators/duplicateCheck';

export const POST = createDuplicateCheckHandler(checkEmailDuplicate, '이메일');
