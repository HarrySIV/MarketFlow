import { Router } from 'express';
import {
  createAccount,
  getAccount,
  updateAccount,
} from '../controllers/account-controller';

const router = Router();

router.post('/create-account', createAccount);
router.post('/login', getAccount);
router.put('/update', updateAccount);

// router.put();
// router.delete();

module.exports = router;
