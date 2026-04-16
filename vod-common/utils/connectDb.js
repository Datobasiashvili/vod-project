const connectDb = async (mongoose, uri, serviceName) => {
    try {
        await mongoose.connect(uri);
        console.log(`Connected to MongoDB: [${serviceName}]`);
    } catch (err) {
        console.error(`MongoDB connection error [${serviceName}]:`, err);
        process.exit(1);
    }
}

module.exports = connectDb;