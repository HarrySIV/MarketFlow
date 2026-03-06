import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import { hashPassword, comparePassword } from '../middleware/hashing';
import { HttpError } from '../utility/http-error';
import Account, { TAccount } from '../models/Account';
import { storeToken, retrieveToken } from '../middleware/account-token';

export const createAccount: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, typedPass } = req.body;

  // checks if req.body is empty, throws an error and continues without creating a work.
  if (Object.keys(req.body).length === 0) {
    const err = new HttpError(`The request body was empty`, 500);
    return next(err);
  }
  const hashedPass = hashPassword(typedPass);
  const createdAccount = new Account({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hashPass: hashedPass,
  });
  try {
    const currentSession = await mongoose.startSession();
    await createdAccount.save();
    await currentSession.endSession();
  } catch (error) {
    const err = new HttpError('could not create account', 500);
  }

  res.json({ account: createdAccount, message: 'account created!' });
};

export const getAccount: RequestHandler = async (req, res, next) => {
  let { email } = req.body;

  const token = retrieveToken();
  if (token) {
    try {
      const storedAccount = JSON.parse(token);
      email = storedAccount.email;
    } catch (error) {
      const err = new HttpError('token failed to parse', 500);
    }
  }

  // checks if req.body is empty, throws an error and continues without creating a work.
  if (!email && !token) {
    const err = new HttpError(
      `The request body was empty and/or there was no token`,
      500,
    );
    return next(err);
  }

  let account: TAccount | null = null;

  try {
    account = await Account.findOne({ email: email });
  } catch (error) {
    const err = new HttpError('could not find account', 500);
  }

  if (account && email && !token) storeToken(JSON.stringify(email));

  res.json({ account: account });
};
