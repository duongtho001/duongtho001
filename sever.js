const express = require('express');
const app = express();
app.use(express.json());

// ✅ Verify Token cho cxgenie.ai
const VERIFY_TOKEN = "6562e459-389d-4483-a317-6fcd6fb6e302";

// 📌 Xác minh Webhook API
app.get('/webhook', (req, res) => {
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (token === VERIFY_TOKEN) {
        console.log("✅ Xác minh Webhook thành công!");
        res.send(challenge);  // Trả về challenge để xác nhận webhook
    } else {
        console.log("❌ Xác minh thất bại!");
        res.sendStatus(403);  // Trả về mã lỗi 403 nếu token không hợp lệ
    }
});

// 📌 API xem tử vi
app.post('/xem-tuvi', (req, res) => {
    const { ngaySinh, thangSinh, namSinh, gioSinh, namXem } = req.body;

    if (!ngaySinh || !thangSinh || !namSinh || !gioSinh || !namXem) {
        return res.status(400).json({ message: "Thiếu thông tin ngày giờ sinh hoặc năm xem." });
    }

    // 🎯 Xử lý luận giải tử vi
    const thienCan = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const diaChi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    
    let can = thienCan[namSinh % 10];  // Tính Thiên Can
    let chi = diaChi[namSinh % 12];    // Tính Địa Chi

    // Tính Cung Mệnh
    const cungMenh = ["Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu"];
    const cungMenh = cungMenh[(namSinh + thangSinh) % 12];

    // Tính Cung Sao
    const cungSao = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const cungSaoIndex = Math.floor(gioSinh / 2); // Giả sử giờ sinh từ 0-23, chia cho 2 để có chỉ số tương ứng
    const cungAnSao = cungSao[cungSaoIndex];

    // Phân tích vận hạn theo tháng
    const danhSachThang = ["Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Chạp"];
    const ketQuaThang = {};
    for (let i = 0; i < danhSachThang.length; i++) {
        const chuKy = (namXem - namSinh + i) % 12;
        if ([0, 4, 8].includes(chuKy)) {
            ketQuaThang[danhSachThang[i]] = "Tháng thuận lợi, dễ gặt hái thành công, tài lộc dồi dào.";
        } else if ([1, 5, 9].includes(chuKy)) {
            ketQuaThang[danhSachThang[i]] = "Cơ hội lớn nhưng cần thận trọng, tránh bị lợi dụng.";
        } else if ([2, 6, 10].includes(chuKy)) {
            ketQuaThang[danhSachThang[i]] = "Có sự biến động mạnh về tài chính, công việc, cần chuẩn bị kỹ lưỡng.";
        } else {
            ketQuaThang[danhSachThang[i]] = "Nên giữ gìn sức khỏe, ổn định tinh thần, tránh quyết định vội vàng.";
        }
    }

    // Phân tích vận hạn chi tiết
    const chiTietVanHan = {
        "Sức Khỏe": "Cần chú trọng đến thể trạng, tránh làm việc quá sức và duy trì chế độ dinh dưỡng hợp lý.",
        "Tiền Tài": "Có cơ hội gia tăng thu nhập, nhưng cần quản lý tài chính hợp lý để tránh hao hụt.",
        "Công Việc": "Thời điểm thuận lợi để phát triển sự nghiệp, nhưng cũng cần đề phòng bị chèn ép hoặc cạnh tranh không lành mạnh.",
        "Hôn Nhân": "Tình cảm ổn định, nhưng cần tránh những hiểu lầm không đáng có, nên dành nhiều thời gian hơn cho đối phương.",
        "Gia Đình": "Quan hệ với bố mẹ, anh chị em có sự gắn kết, nhưng đôi khi dễ xảy ra xung đột nhỏ do khác biệt quan điểm."
    };

    // Kết quả cuối cùng
    const ketQua = {
        message: "Luận giải vận hạn",
        tongQuan: {
            namSinh: `${can} ${chi}`,  // Thiên Can + Địa Chi của năm sinh
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
        duBao: ketQuaThang,
        chiTietVanHan: chiTietVanHan
    };

    res.json(ketQua);
});

// ✅ Khởi động server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server chạy trên cổng ${PORT}`));
