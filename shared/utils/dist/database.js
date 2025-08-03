"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseUtils = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseUtils {
    static async connect(uri) {
        try {
            await mongoose_1.default.connect(uri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            console.log('Connected to MongoDB');
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1);
        }
    }
    static async disconnect() {
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
    static isValidObjectId(id) {
        return mongoose_1.default.Types.ObjectId.isValid(id);
    }
    static toObjectId(id) {
        return new mongoose_1.default.Types.ObjectId(id);
    }
    static generateObjectId() {
        return new mongoose_1.default.Types.ObjectId();
    }
}
exports.DatabaseUtils = DatabaseUtils;
//# sourceMappingURL=database.js.map