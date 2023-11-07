"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
/* app.get('/', (req, res) => {
    console.log('GET request is there');
}); */
app.get('/api', (req, res) => {
    console.log('GET request is there');
    res.json({ message: "Hello from the server" });
});
app.post('/cv-style', (req, res) => {
    // console.log(req);
    console.log(req.body);
    // res.json(req.body);
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
