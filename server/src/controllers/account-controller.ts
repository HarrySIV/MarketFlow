import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { hashPassword, comparePassword } from '../middleware/hashing';
import { HttpError } from '../utility/http-error';
import Account, { TAccount } from '../models/Account';

export const createAccount: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    const err = new HttpError('there was no req.body', 500);
    return next(err);
  }
  const { firstName, lastName, email, password } = req.body;
  const hashedPass = await hashPassword(password);
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
    return next(err);
  }

  res
    .status(201)
    .json({ account: createdAccount, message: 'account created!' });
};

export const getAccount: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    const err = new HttpError('there was no req.body', 500);
    return next(err);
  }
  const data = req.body;
  let tokenData = null;
  if (data.token) {
    try {
      tokenData = jwt.verify(
        data.token,
        process.env.SECRET_KEY!,
      ) as jwt.JwtPayload;
    } catch (error) {
      const err = new HttpError('could not verify token', 500);
      return next(err);
    }
  }

  let account: TAccount | null = null;
  let email = null;
  if (data.email) {
    email = data.email;
  }
  if (tokenData) {
    try {
      email = tokenData.email;
    } catch (error) {
      const err = new HttpError('could not parse token data', 500);
      return next(err);
    }
  }

  let newToken = null;
  try {
    account = await Account.findOne({ email: email });
  } catch (error) {
    const err = new HttpError('could not find account', 500);
    return next(err);
  }
  if (account && data.password) {
    const isPass = await comparePassword(data.password, account.hashPass);
    if (isPass) {
      try {
        newToken = jwt.sign({ email: email }, process.env.SECRET_KEY!, {
          expiresIn: '30d',
        });
      } catch (error) {
        const err = new HttpError('password did not match', 500);
        return next(err);
      }
    }
  } else if (tokenData) {
    try {
      newToken = jwt.sign({ email: email }, process.env.SECRET_KEY!, {
        expiresIn: '30d',
      });
    } catch (error) {
      const err = new HttpError('token could not sign', 500);
      return next(err);
    }
  } else {
    const err = new HttpError('no password or token was provided', 500);
    return next(err);
  }
  res.json({ account: account, token: newToken });
};

export const updateAccount: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    const err = new HttpError('there was no req.body', 500);
    return next(err);
  }
  const data = req.body;
  let tokenData = null;
  try {
    tokenData = jwt.verify(
      data.token,
      process.env.SECRET_KEY!,
    ) as jwt.JwtPayload;
  } catch (error) {
    const err = new HttpError('could not verify token', 500);
    return next(err);
  }

  let newToken = null;
  const newHashPasss = await hashPassword(data.password);
  try {
    await Account.updateOne(
      {
        email: tokenData.email,
      },
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: newHashPasss,
      },
    );
    newToken = jwt.sign({ email: data.email }, process.env.SECRET_KEY!, {
      expiresIn: '30d',
    });
  } catch (error) {
    const err = new HttpError('account did not update', 500);
    return next(err);
  }

  const account = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  };
  res.json({ account: account, token: newToken, message: 'update succesful' });
};

export const deleteAccount: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    const err = new HttpError('there was no req.body', 500);
    return next(err);
  }
  const data = req.body;
  let tokenData = null;
  try {
    tokenData = jwt.verify(
      data.token,
      process.env.SECRET_KEY!,
    ) as jwt.JwtPayload;
  } catch (error) {
    const err = new HttpError('could not verify token', 500);
    return next(err);
  }

  let email = null;
  try {
    email = tokenData.email;
  } catch (error) {
    const err = new HttpError('could not parse token data', 500);
    return next(err);
  }
  let account: TAccount | null = null;
  try {
    account = await Account.findOne({ email: email });
  } catch (error) {
    const err = new HttpError('could not find account', 500);
    return next(err);
  }
  if (account && data.password) {
    const isPass = await comparePassword(data.password, account.hashPass);
    if (isPass) {
      try {
        await Account.deleteOne({ email: email });
      } catch (error) {
        const err = new HttpError('could not delete account', 500);
        return next(err);
      }
    }
  } else {
    const err = new HttpError('no password was provided', 500);
    return next(err);
  }
  res.json({ account: account, message: 'account deleted' });
};
