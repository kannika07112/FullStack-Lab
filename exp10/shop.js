const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "shop";
async function main() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("products");
    const insertResult = await collection.insertMany([
      { name: "Laptop", price: 60000, quantity: 5 },
      { name: "Mouse", price: 800, quantity: 50 },
      { name: "Keyboard", price: 1500, quantity: 30 }
    ]);
    console.log("Inserted documents =>", insertResult.insertedCount);

    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);

    const updateResult = await collection.updateOne(
      { name: "Laptop" },
      { $set: { price: 58000 } }
    );
    console.log("Updated documents =>", updateResult.modifiedCount);

    const deleteResult = await collection.deleteOne({ name: "Mouse" });
    console.log("Deleted documents =>", deleteResult.deletedCount);

    const finalDocs = await collection.find({}).toArray();
    console.log("Final collection data =>", finalDocs);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();
