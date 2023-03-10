"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("./app"));
const prisma = new client_1.PrismaClient();
async function main() {
    const candy = await prisma.candy.create({
        data: {
            name: 'Gummy Bears',
            flavor: 'Assorted',
            color: 'Rainbow',
            priceCents: 299,
        },
    });
    console.log(candy);
}
// Start server
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map