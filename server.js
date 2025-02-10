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

// 📌 API xem tử vi (trả kết quả dưới dạng văn bản)
app.post('/xem-tuvi', (req, res) => {
    const { ngaySinh, thangSinh, namSinh, gioSinh, namXem } = req.body;

    if (!ngaySinh || !thangSinh || !namSinh || !gioSinh || !namXem) {
        return res.status(400).send("Thiếu thông tin ngày giờ sinh hoặc năm xem.");
    }

    // 🎯 Xử lý luận giải tử vi
    const thienCan = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const diaChi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    
    let can = thienCan[namSinh % 10];  // Tính Thiên Can
    let chi = diaChi[namSinh % 12];    // Tính Địa Chi

    // 🎯 Kết quả phân tích tử vi dưới dạng văn bản
    const ketQua = `
    **Luận Giải Tử Vi:**
    
    - **Thiên Can - Địa Chi của bạn**: ${can} ${chi}
    - **Ngũ Hành**: Kiếm Phong Kim
    - **Tính cách**: Kiên định, mạnh mẽ nhưng đôi khi quá cứng nhắc.
    
    **Sao chiếu mệnh**:
    - **Sao**: Thái Âm
    - **Đánh giá**: Tốt cho công danh, nhưng cần đề phòng về sức khỏe.
    
    **Hạn năm**:
    - **Hạn**: Diêm Vương
    - **Mô tả**: Cẩn thận về sức khỏe, tài chính có thể bị hao hụt bất ngờ.

    **Vận Niên**:
    - **Tên**: Xà Hãm Tỉnh
    - **Mô tả**: Dễ gặp khó khăn, nhưng nếu kiên trì sẽ vượt qua.

    **Dự Báo** (theo tháng):
    - **Tháng 1**: Khởi đầu thuận lợi, có quý nhân phù trợ.
    - **Tháng 2**: Tài chính gặp may mắn, nhưng cần tiết kiệm.
    - **Tháng 3**: Cẩn trọng kẻ tiểu nhân, tránh thị phi.
    - **Tháng 4**: Công việc tiến triển, cơ hội mở rộng.
    - **Tháng 5**: Dễ gặp thử thách, không nên đầu tư mạo hiểm.
    - **Tháng 6**: Tinh thần căng thẳng, cần giữ bình tĩnh.
    - **Tháng 7**: Cơ hội mới trong sự nghiệp, nhưng cần sáng suốt.
    - **Tháng 8**: Gia đình hòa thuận, nên quan tâm người thân.
    - **Tháng 9**: Sự nghiệp ổn định, tránh thay đổi lớn.
    - **Tháng 10**: Dễ gặp tiểu nhân, không nên cho vay mượn.
    - **Tháng 11**: Tài chính khởi sắc, nhưng không nên chủ quan.
    - **Tháng 12**: Cuối năm thuận lợi, có thể đạt thành tựu quan trọng.

    **Lời khuyên**:
    Hãy tập trung vào công việc, tránh vội vàng trong các quyết định lớn.
    `;

    // Trả kết quả luận giải tử vi dưới dạng văn bản
    res.send(ketQua);
});

// ✅ Khởi động server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server chạy trên cổng ${PORT}`));
