import mongoose from 'mongoose';
import { ILoyaltyProgram, IUserLoyalty } from '@billing/types';
export declare const LoyaltyProgram: mongoose.Model<ILoyaltyProgram, {}, {}, {}, mongoose.Document<unknown, {}, ILoyaltyProgram, {}, {}> & ILoyaltyProgram & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export declare const UserLoyalty: mongoose.Model<IUserLoyalty, {}, {}, {}, mongoose.Document<unknown, {}, IUserLoyalty, {}, {}> & IUserLoyalty & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=LoyaltyProgram.d.ts.map