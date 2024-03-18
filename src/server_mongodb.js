// Import the MongoDB module
const { MongoClient } = require('mongodb');

// Connection URI for the MongoDB database
const uri = "mongodb+srv://ljm8350:<l0j1m188350!>@mongopractice.osgmeti.mongodb.net/?retryWrites=true&w=majority&appName=mongoPractice";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// mongodb 연결
client.connect(async (err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  // Access the database and collection
  const database = client.db('mongoPractice');
  const collection = database.collection('your_collection_name');

  // Insert a document
  await collection.insertOne({ key: 'value' });

  // Find documents
  const documents = await collection.find({}).toArray();
  console.log('Documents:', documents);

  // Update a document
  await collection.updateOne({ key: 'value' }, { $set: { key: 'new_value' } });

  // Delete a document
  await collection.deleteOne({ key: 'new_value' });

  // Close the connection
  client.close();
});

