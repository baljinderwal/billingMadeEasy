import mongoose from 'mongoose';
export declare class DatabaseUtils {
    static connect(uri: string): Promise<void>;
    static disconnect(): Promise<void>;
    static isValidObjectId(id: string): boolean;
    static toObjectId(id: string): mongoose.Types.ObjectId;
    static generateObjectId(): mongoose.Types.ObjectId;
}
//# sourceMappingURL=database.d.ts.map