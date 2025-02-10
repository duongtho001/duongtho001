const express = require('express');
const app = express();
app.use(express.json());

app.post('/xem-tuvi', (req, res) => {
    const { ngaySinh, thangSinh, namSinh, gioSinh, namXem } = req.body;

    if (!ngaySinh || !thangSinh || !namSinh || !gioSinh || !namXem) {
        return res.status(400).json({ message: "Thiếu thông tin ngày giờ sinh hoặc năm xem." });
    }

    const thienCan = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const diaChi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    
    let can = thienCan[namSinh % 10];
    let chi = diaChi[namSinh % 12];

    let ketQua = {
        message: "Luận giải vận hạn",
        tongQuan: {
            namSinh: `${can} ${chi}`,
            nguHanh: "Kiếm Phong Kim",
            tinhCach: "Kiên định, mạnh mẽ nhưng đôi khi quá cứng nhắc."
        },
        saoChieuMenh: {
            sao: "Thái Âm",
            danhGia: "Tốt cho công danh, nhưng cần đề phòng về sức khỏe."
        },
        hanNam: {
            han: "Diêm Vương",
            moTa: "Cẩn thận về sức khỏe, tài chính có thể bị hao hụt bất ngờ."
        },
        vanNien: {
            ten: "Xà Hãm Tỉnh",
            moTa: "Dễ gặp khó khăn, nhưng nếu kiên trì sẽ vượt qua."
        },
        duBao: {
            thang1: "Khởi đầu thuận lợi, có quý nhân phù trợ.",
            thang2: "Tài chính gặp may mắn, nhưng cần tiết kiệm.",
            thang3: "Cẩn trọng kẻ tiểu nhân, tránh thị phi.",
            thang4: "Công việc tiến triển, cơ hội mở rộng.",
            thang5: "Dễ gặp thử thách, không nên đầu tư mạo hiểm.",
            thang6: "Tinh thần căng thẳng, cần giữ bình tĩnh.",
            thang7: "Cơ hội mới trong sự nghiệp, nhưng cần sáng suốt.",
            thang8: "Gia đình hòa thuận, nên quan tâm người thân.",
            thang9: "Sự nghiệp ổn định, tránh thay đổi lớn.",
            thang10: "Dễ gặp tiểu nhân, không nên cho vay mượn.",
            thang11: "Tài chính khởi sắc, nhưng không nên chủ quan.",
            thang12: "Cuối năm thuận lợi, có thể đạt thành tựu quan trọng."
        },
        loiKhuyen: "Hãy tập trung vào công việc, tránh vội vàng trong các quyết định lớn."
    };

    res.json(ketQua);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "my_secret_token"; // Token bạn tự đặt

// Xác minh Webhook
app.get('/webhook', (req, res) => {
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (token === VERIFY_TOKEN) {
        console.log("✅ Xác minh Webhook thành công!");
        res.send(challenge);
    } else {
        console.log("❌ Xác minh thất bại!");
        res.sendStatus(403);
    }
});

// Xử lý yêu cầu xem tử vi
app.post('/xem-tuvi', (req, res) => {
    const { ngaySinh, thangSinh, namSinh, gioSinh, namXem } = req.body;

    if (!ngaySinh || !thangSinh || !namSinh || !gioSinh || !namXem) {
        return res.status(400).json({ message: "Thiếu thông tin ngày giờ sinh hoặc năm xem." });
    }

    // Xử lý tử vi (Giống code trước)
    const ketQua = {
        message: "Luận giải vận hạn",
        namSinh: `${namSinh}`,
        duBao: "Năm 2025 có nhiều cơ hội nhưng cần đề phòng sức khỏe.",
        loiKhuyen: "Hãy tập trung vào mục tiêu, tránh quyết định vội vàng."
    };

    res.json(ketQua);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
const express = require('express');
const app = express();
app.use(express.json());

// ✅ Đặt Verify Token của bạn
const VERIFY_TOKEN = "6562e459-389d-4483-a317-6fcd6fb6e302";

// 📌 Route xác minh webhook cho cxgenie.ai
app.get('/webhook', (req, res) => {
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (token === VERIFY_TOKEN) {
        console.log("✅ Xác minh Webhook thành công!");
        res.send(challenge);
    } else {
        console.log("❌ Xác minh thất bại!");
        res.sendStatus(403);
    }
});

// 📌 API xử lý xem tử vi
app.post('/xem-tuvi', (req, res) => {
    const { ngaySinh, thangSinh, namSinh, gioSinh, namXem } = req.body;

    if (!ngaySinh || !thangSinh || !namSinh || !gioSinh || !namXem) {
        return res.status(400).json({ message: "Thiếu thông tin ngày giờ sinh hoặc năm xem." });
    }

    // 🎯 Xử lý tử vi cơ bản
    const ketQua = {
        message: "Luận giải vận hạn",
        namSinh: `${namSinh}`,
        duBao: "Năm 2025 có nhiều cơ hội nhưng cần đề phòng sức khỏe.",
        loiKhuyen: "Hãy tập trung vào mục tiêu, tránh quyết định vội vàng."
    };

    res.json(ketQua);
});

// ✅ Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy trên cổng ${PORT}`));
