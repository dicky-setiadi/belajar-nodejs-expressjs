import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("CONTOHRAHASIA"));
app.use(express.json());

app.get('/', (req, res) => {
    const name = req.signedCookies["Login"];
    res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie("Login", name, { path: "/", signed: true });
    res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
    const response = await request(app).get("/")
        .set("Cookie", "Login=s%3ADicky.wGOJGsLDpwKtWxM%2FHtAVhVmIX9QOO9%2F51kCqehJ7%2BxQ; Path=/");
    expect(response.text).toBe("Hello Dicky");
});

test("Test Cookie Write", async () => {
    const response = await request(app).post("/login")
        .send({ name: "Dicky" });
    console.info(response.get("Set-Cookie"));
    expect(response.get("Set-Cookie").toString()).toContain("Dicky");
    expect(response.text).toBe("Hello Dicky");
});
