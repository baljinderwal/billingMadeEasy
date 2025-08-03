"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = require("@billing/middleware");
const middleware_2 = require("@billing/middleware");
const vendors_1 = __importDefault(require("./routes/vendors"));
const applications_1 = __importDefault(require("./routes/applications"));
const commissions_1 = __importDefault(require("./routes/commissions"));
const payouts_1 = __importDefault(require("./routes/payouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3009;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(middleware_2.corsOptions));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/vendors', vendors_1.default);
app.use('/api/applications', applications_1.default);
app.use('/api/commissions', commissions_1.default);
app.use('/api/payouts', payouts_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'vendor-service' });
});
app.use(middleware_1.notFound);
app.use(middleware_1.errorHandler);
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Vendor service running on port ${PORT}`);
    });
};
startServer().catch(console.error);
//# sourceMappingURL=server.js.map