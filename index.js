require("dotenv").config();
const express = require("express");
const wkhtmltopdf = require("wkhtmltopdf");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post("/generate", (req, res) => {
    const { html, pageSize } = req.body;
    
    if (!html) return res.status(400).json({ error: "html field required" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=output.pdf");

    wkhtmltopdf(html, {
        pageSize: pageSize || "A6",
        marginTop: "5mm",
        marginBottom: "5mm",
        marginLeft: "0mm",
        marginRight: "0mm",
        disableSmartShrinking: true
    }).pipe(res);
});

app.listen(port, () => {
    console.log(`server running on http://:${port}`);
});
