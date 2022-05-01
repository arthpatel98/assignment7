require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

const COLLECTION = {
  DELETED_PRODUCTS: 'deleted_products',
  COUNTERS: 'counters',
  PRODUCTS: 'products',
};

const url = process.env.DB_URL
  || 'mongodb+srv://hmac:cs648@cluster0.uimtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function connectToDb() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function uidForDocument(name) {
  const result = await db
    .collection(COLLECTION.COUNTERS)
    .findOneAndUpdate(
      { _id: name },
      { $inc: { uid: 1 } },
      { returnOriginal: false },
    );
  return result.value.uid;
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected, try calling connectToDb method before accessing DB.');
  }
  return db;
}

module.exports = {
  connectToDb,
  uidForDocument,
  getDb,
  COLLECTION,
};
