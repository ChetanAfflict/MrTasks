const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("myDatabase");
        global.users = db.collection("users"); // Store globally for function access

        // Task Usage (Sequential execution inside an async function)
        await createUser("radhe", 25);
        await createUser("Krishna", 26);
        await getUsers();
        await updateUser("radhe", 30);
        await getUsers();
        await deleteUser("radhe");
        await getUsers();

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

// Create - Insert a User
async function createUser(name, age) {
    try {
        const existingUser = await users.findOne({ name });

        if (!existingUser) {
            await users.insertOne({ name, age });
            console.log(`User "${name}" inserted successfully!`);
        } else {
            console.log(`User "${name}" already exists!`);
        }
    } catch (error) {
        console.error("Error inserting user:", error);
    }
}

// Read - Get all Users
async function getUsers() {
    try {
        const allUsers = await users.find().toArray();
        console.log("All Users:", allUsers);
    } catch (error) {
        console.error("Error retrieving users:", error);
    }
}

// Update - Modify User Data
async function updateUser(name, newAge) {
    try {
        const result = await users.updateOne(
            { name }, // Find user by name
            { $set: { age: newAge } } // Update age field
        );

        if (result.modifiedCount > 0) {
            console.log(`User "${name}" updated successfully!`);
        } else {
            console.log(`No user found to update with name "${name}".`);
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

// Delete - Remove a User
async function deleteUser(name) {
    try {
        const result = await users.deleteOne({ name });

        if (result.deletedCount > 0) {
            console.log(`User "${name}" deleted successfully!`);
        } else {
            console.log(`No user found to delete with name "${name}".`);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// Run the script
run().catch(console.error);