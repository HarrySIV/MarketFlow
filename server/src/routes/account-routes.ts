import { Router } from 'express';
import { createAccount, getAccount } from '../controllers/account-controller';

const router = Router();

router.post('/create-account', createAccount);
router.get('/*', getAccount);
router.get('/login', getAccount);

// router.put();
// router.delete();

module.exports = router;
