const { getDb, uidForDocument, COLLECTION } = require('./db.js');

const { DELETED_PRODUCTS, PRODUCTS } = COLLECTION;

const get = async (_, { id }) => {
  const db = getDb();
  return db.collection(PRODUCTS).findOne({ id });
};

const list = async () => {
  const db = getDb();
  return db.collection(PRODUCTS).find({}).toArray();
};

const add = async (_, { product }) => {
  const db = getDb();
  // eslint-disable-next-line no-param-reassign
  product.id = await uidForDocument(PRODUCTS);

  const result = await db.collection(PRODUCTS).insertOne(product);
  return db
    .collection(PRODUCTS)
    .findOne({ _id: result.insertedId });
};

const update = async (_, { id, changes }) => {
  const db = getDb();
  if (changes.name || changes.category || changes.price || changes.imageUrl) {
    const product = await db.collection(PRODUCTS).findOne({ id });
    Object.assign(product, changes);
  }
  await db.collection(PRODUCTS).updateOne({ id }, { $set: changes });
  return db.collection(PRODUCTS).findOne({ id });
};

const remove = async (_, { id }) => {
  const db = getDb();
  const product = await db.collection(PRODUCTS).findOne({ id });
  if (!product) return false;

  product.deleted = new Date();
  let result = await db.collection(DELETED_PRODUCTS).insertOne(product);
  if (result.insertedId) {
    result = await db.collection(PRODUCTS).removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
};

const count = async () => {
  let productCount = 0;
  const db = getDb();
  const products = await db.collection('products')
    .aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ]).toArray();

  if (products.length > 0) {
    productCount = products[0].total;
  }
  return productCount;
};

module.exports = {
  get, list, add, update, delete: remove, count,
};
