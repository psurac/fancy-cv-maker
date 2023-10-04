"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.get('/api', (req, res) => {
    res.json({ message: "Hello from the server" });
});
app.get('/cv-style', (req, res) => {
    console.log(req);
    // res.json({message: "Hello there!"})
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
