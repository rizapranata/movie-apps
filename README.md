# React + Vite


1️⃣ Clone Repository (Jika Belum di Clone)

- git clone <https://github.com/rizapranata/movie-apps>
- cd movie-apps

2️⃣ Pastikan Node.js Sudah Terinstall

Pastikan kamu memiliki Node.js versi terbaru (disarankan versi 18 atau lebih tinggi). Cek dengan perintah:

- node -v

3️⃣ Install Dependencies

Jalankan perintah berikut untuk menginstal semua dependencies yang diperlukan:

- npm install

4️⃣ Menjalankan Proyek di Localhost

Setelah semua dependencies terinstall, jalankan perintah berikut untuk menjalankan server development:

- npm run dev

Setelah itu, buka browser dan akses:

- http://localhost:5173/

📦 Dependencies yang Digunakan

Proyek ini menggunakan beberapa dependencies utama:

- antd → UI Library dari Ant Design
- axios → Untuk melakukan HTTP request
- movie-app → Modul lokal
- react & react-dom → Library utama React
- react-router-dom → Untuk routing
- tailwindcss-no-scrollbar → Menghilangkan scrollbar
- zustand → Untuk manajemen state global

⚙️ Konfigurasi Tailwind CSS

Pastikan Tailwind sudah dikonfigurasi dengan benar di tailwind.config.js:

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-no-scrollbar")
  ],
}

✅ Tips & Troubleshooting

1️⃣ Jika Terjadi Error Saat Install Dependencies

Coba hapus folder node_modules dan file package-lock.json, lalu install ulang dependencies:

- rm -rf node_modules package-lock.json
- npm install

2️⃣ Jika Port 5173 Sudah Digunakan

Jalankan Vite dengan port yang berbeda:

- npm run dev -- --port 3000

Lalu akses di: http://localhost:3000/

3️⃣ Jika Tailwind Tidak Bekerja

Pastikan file index.css di src/main.tsx telah mengimpor Tailwind:

@tailwind base;
@tailwind components;
@tailwind utilities;