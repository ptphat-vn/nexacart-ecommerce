# CLAUDE.md

## Bối cảnh

- Dự án **nexacart-ecommerce**: backend e-commerce viết bằng **NestJS** (TypeScript).
- Mình đang **học NestJS** qua dự án này. Hãy trả lời bằng **tiếng Việt**, giải thích *tại sao* chứ không chỉ đưa code.
- Lệnh hay dùng: `npm run start:dev` (chạy dev), `npm run lint` (oxlint), `npm run test`, `npm run format`.

## Ghi chép bài học (QUAN TRỌNG)

Mỗi buổi học/code, ghi lại bài học vào thư mục `docs/lessons/`.

### Khi nào ghi

- Khi mình nói: **"ghi bài"**, **"tổng kết"**, **"lưu bài học"**, **"hết buổi"** hoặc ý tương tự.
- Khi vừa xong một phần kiến thức/tính năng đáng kể mà mình chưa yêu cầu ghi → **hỏi** mình có muốn ghi lại không (đừng tự ghi).

### Ghi ở đâu

- Mỗi ngày 1 file: `docs/lessons/YYYY-MM-DD.md` (lấy ngày hiện tại).
- Nếu file của ngày đó đã có → **thêm** một mục `## Buổi N` mới vào cuối, không ghi đè nội dung cũ.
- Sau khi ghi, cập nhật mục lục `docs/lessons/README.md` (mỗi ngày 1 dòng: ngày — chủ đề chính — link file).
- `docs/notion.md` là ghi chú tự viết của mình: **không sửa** file này trừ khi mình yêu cầu.

### Lấy nội dung từ đâu

1. Nội dung cuộc trò chuyện trong buổi (câu hỏi, giải thích, lỗi gặp phải).
2. `git status` / `git diff` để biết hôm nay đã sửa/thêm file nào.
3. Chỉ ghi những gì **thực sự đã học/đã làm** — không bịa thêm kiến thức chưa đụng tới.

### Mẫu cho mỗi buổi

```markdown
# Bài học ngày YYYY-MM-DD

## Buổi N — <chủ đề ngắn gọn>

### 🎯 Mục tiêu
- Hôm nay muốn làm/học gì.

### 📚 Kiến thức đã học
#### <Khái niệm 1>
- Giải thích ngắn, dễ hiểu (như giảng cho người mới).
- Ví dụ code trích từ chính dự án (ghi rõ đường dẫn file), chỉ đoạn liên quan, không dán cả file.

### 🛠️ Đã code những gì
| File | Thay đổi |
|------|----------|
| `src/...` | ... |

### 🐛 Lỗi gặp phải & cách sửa
- **Lỗi:** ... → **Nguyên nhân:** ... → **Cách sửa:** ...

### 💡 Ghi nhớ nhanh
- 3–5 gạch đầu dòng tóm tắt điều quan trọng nhất.

### ❓ Câu hỏi còn bỏ ngỏ / Việc tiếp theo
- [ ] ...
```

Bỏ qua mục nào không có nội dung (vd: không gặp lỗi thì bỏ mục 🐛).

### Phong cách ghi

- Tiếng Việt, thuật ngữ kỹ thuật giữ nguyên tiếng Anh (Provider, Dependency Injection, DTO...).
- Ngắn gọn, dễ ôn lại; ưu tiên ví dụ thật trong dự án hơn lý thuyết chung chung.
- Nếu một khái niệm đã ghi ở buổi trước, chỉ nhắc lại ngắn và link tới file cũ.
