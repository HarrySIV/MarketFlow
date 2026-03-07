import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { hashPassword, comparePassword } from '../middleware/hashing';
import { HttpError } from '../utility/http-error';
import Account, { TAccount } from '../models/Account';

export const createAccount: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // checks if req.body is empty, throws an error and continues without creating a work.
  if (Object.keys(req.body).length === 0) {
    const err = new HttpError(`The request body was empty`, 500);
    return next(err);
  }
  const hashedPass = await hashPassword(password);
  const createdAccount = new Account({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hashPass: hashedPass,
  });
  try {
    console.log(createdAccount);
    const currentSession = await mongoose.startSession();
    await createdAccount.save();
    await currentSession.endSession();
  } catch (error) {
    const err = new HttpError('could not create account', 500);
    return next(err);
  }

  res
    .status(201)
    .json({ account: createdAccount, message: 'account created!' });
};

export const getAccount: RequestHandler = async (req, res, next) => {
  const { typedEmail, token } = req.body;

  // checks if req.body is empty, throws an error and continues without creating a work.
  if (Object.keys(req.body).length === 0) {
    const err = new HttpError(`The request body was empty`, 500);
    return next(err);
  }

  let tokenData = null;
  if (token) {
    try {
      tokenData = jwt.verify(token, process.env.SECRET_KEY!);
    } catch (error) {
      const err = new HttpError('could not find account', 500);
    }
  }

  let account: TAccount | null = null;
  let email = typedEmail;
  if (tokenData) {
    try {
      const parsedToken = JSON.parse(tokenData as string);
      email = parsedToken.email;
    } catch (error) {
      const err = new HttpError('could not find account', 500);
    }
  }

  try {
    account = await Account.findOne({ email: email });
  } catch (error) {
    const err = new HttpError('could not find account', 500);
  }

  const newToken = jwt.sign({ email: email }, process.env.SECRET_KEY!, {
    expiresIn: '30d',
  });
  res.json({ account: account, token: newToken });
};
