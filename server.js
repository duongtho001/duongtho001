const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "6562e459-389d-4483-a317-6fcd6fb6e302";

// 📌 Webhook verification
app.get('/webhook', (req, res) => {
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (token === VERIFY_TOKEN) {
        console.log("✅ Webhook Verified!");
        res.send(challenge);
    } else {
        console.log("❌ Verification Failed!");
        res.sendStatus(403);
    }
});

// 📌 Simple API Endpoint
app.post('/xem-tuvi', (req, res) => {
    const { ngaySinh, thangSinh, namSinh, gioSinh, namXem } = req.body;

    if (!ngaySinh || !thangSinh || !namSinh || !gioSinh || !namXem) {
        return res.status(400).json({ message: "Missing required parameters." });
    }

    const ketQua = {
        message: "Luận giải vận hạn",
        namSinh: `${namSinh}`,
        duBao: "Năm 2025 có nhiều cơ hội nhưng cần đề phòng sức khỏe.",
        loiKhuyen: "Hãy tập trung vào mục tiêu, tránh quyết định vội vàng."
    };

    res.json(ketQua);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
