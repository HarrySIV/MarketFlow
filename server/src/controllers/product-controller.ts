import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import { HttpError } from '../utility/http-error';
import Product, { TProduct } from '../models/Product';

export const createProduct: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    const err = new HttpError('there was no req.body', 500);
    return next(err);
  }
  const { title, description, price, quantity } = req.body;

  const createdProduct = new Product({
    title: title,
    description: description,
    price: price,
    quantity: quantity,
  });
  try {
    const currentSession = await mongoose.startSession();
    await createdProduct.save();
    await currentSession.endSession();
  } catch (error) {
    const err = new HttpError('could not create product', 500);
    return next(err);
  }

  res
    .status(201)
    .json({ account: createdProduct, message: 'product created!' });
};

export const getProducts: RequestHandler = async (req, res, next) => {
  let products: TProduct[] = [];

  try {
    products = await Product.find({});
  } catch (error) {
    const err = new HttpError('could not find products', 500);
  }

  res.json({ products: products });
};
