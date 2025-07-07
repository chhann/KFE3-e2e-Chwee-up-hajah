import { createDuplicateCheckHandler } from '../../../../../shared/lib/validators/createDuplicateCheckHandler';
import { checkUsernameDuplicate } from '../../../../../shared/lib/validators/duplicateCheck';

export const POST = createDuplicateCheckHandler(checkUsernameDuplicate, '닉네임');
