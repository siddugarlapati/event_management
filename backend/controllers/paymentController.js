import Stripe from 'stripe';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { logTransaction } from '../utils/blockchainSimulator.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, eventId, toUserId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      metadata: { eventId, fromUserId: req.user.id, toUserId }
    });

    const transaction = await Transaction.create({
      eventId,
      fromUser: req.user.id,
      toUser: toUserId,
      amount,
      type: 'payment',
      stripePaymentId: paymentIntent.id
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);
    transaction.status = 'completed';
    
    const logged = logTransaction(transaction.toObject());
    transaction.blockchainHash = logged.blockchainHash;
    await transaction.save();

    const recipient = await User.findById(transaction.toUser);
    recipient.wallet += transaction.amount;
    await recipient.save();

    res.json({ transaction, blockchainHash: logged.blockchainHash });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }]
    })
      .populate('fromUser', 'name email')
      .populate('toUser', 'name email')
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
