import crypto from 'crypto';

export const generateContract = (eventData, parties) => {
  const contract = {
    eventId: eventData._id,
    parties,
    terms: {
      eventDate: eventData.date,
      location: eventData.location,
      budget: eventData.budget,
      services: eventData.vendors
    },
    timestamp: new Date().toISOString(),
    status: 'active'
  };

  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(contract))
    .digest('hex');

  return {
    contract,
    hash,
    blockNumber: Math.floor(Math.random() * 1000000)
  };
};

export const logTransaction = (transaction) => {
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(transaction))
    .digest('hex');

  return {
    ...transaction,
    blockchainHash: hash,
    timestamp: new Date().toISOString(),
    immutable: true
  };
};
