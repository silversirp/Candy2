"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use(express_1.default.json());
// Routes
app.get('/candies', async (req, res) => {
    try {
        const candies = await prisma.candy.findMany();
        res.json(candies);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/candies', async (req, res) => {
    try {
        const candy = await prisma.candy.create({
            data: {
                name: req.body.name,
                flavor: req.body.flavor,
                color: req.body.color,
                priceCents: req.body.priceCents,
            },
        });
        res.json(candy);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map