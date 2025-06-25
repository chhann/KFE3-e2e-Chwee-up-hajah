import { createDuplicateCheckHandler } from '../../../../../lib/validators/createDuplicateCheckHandler';
import { checkUsernameDuplicate } from '../../../../../lib/validators/duplicateCheck';

export const POST = createDuplicateCheckHandler(checkUsernameDuplicate, '닉네임');
