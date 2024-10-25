## Struktur Direktori Kode Sumber

Deskripsi singkat tentang struktur direktori proyek:

<pre>
.babelrc                   # Konfigurasi Babel untuk transpiling JavaScript.
.gitignore                 # Daftar file dan folder yang diabaikan oleh Git (seperti node_modules).
.prettierrc                # Konfigurasi Prettier untuk menjaga konsistensi format kode.
.webpack                   # Folder konfigurasi Webpack (jika ada lebih dari satu file).
forge.config.js            # Konfigurasi untuk Electron Forge, memudahkan pengemasan aplikasi.

images                     # Folder untuk menyimpan aset gambar.
images/icon.png            # Ikon utama aplikasi.
images/icon-16.png         # Ikon ukuran 16x16 untuk tampilan kecil.
images/icon-24.png         # Ikon ukuran 24x24 untuk tampilan sedang.
images/icon.ico            # Ikon dalam format .ico untuk Windows.

lit-localize.json          # Konfigurasi untuk Lit Localize, mendukung internasionalisasi.
node_modules               # Folder yang dihasilkan secara otomatis berisi semua dependensi npm.
out                        # Folder output untuk hasil build aplikasi.
package-lock.json          # Versi pasti dari setiap dependensi npm.
package.json               # File konfigurasi npm dengan informasi proyek dan dependensi.
postcss.config.js          # Konfigurasi untuk PostCSS, digunakan untuk mengolah CSS.
README.md                  # Dokumentasi dasar proyek.

src                        # Folder utama untuk semua sumber kode aplikasi.
src/index.js               # Entry point utama untuk aplikasi.
src/main.js                # Skrip utama untuk proses utama Electron.
src/preload.js             # Skrip preload untuk konteks aman sebelum renderer dimuat.
src/renderer.js            # Skrip untuk proses renderer (frontend) yang menangani UI dan interaksi pengguna.

src/api/                   # Folder untuk menyimpan semua API yang digunakan dalam aplikasi.
src/api/index.js           # Entry point untuk API, mengelola dan mengekspor semua API yang tersedia.

src/app/                   # Folder untuk logika dan struktur aplikasi.
src/app/index.js           # Entry point untuk aplikasi, menginisialisasi bagian aplikasi.

src/components/            # Folder untuk menyimpan komponen UI berbasis Lit.
src/components/index.js    # Entry point untuk komponen, mengelola dan mengekspor semua komponen UI.

src/generated/             # Folder untuk menyimpan kode yang dihasilkan secara otomatis.
src/generated/index.js     # Entry point untuk kode yang dihasilkan, mengelola ekspor dari kode yang dihasilkan.

src/libraries/             # Folder untuk menyimpan pustaka tambahan yang digunakan dalam aplikasi.
src/libraries/index.js     # Entry point untuk pustaka, mengelola dan mengekspor semua pustaka yang digunakan.

webpack.main.config.js     # Konfigurasi Webpack untuk bundling kode backend.
webpack.renderer.config.js  # Konfigurasi Webpack untuk bundling kode frontend.
webpack.rules.js           # Aturan untuk pengolahan file dalam Webpack.
xliff                      # Folder untuk file XLIFF, mungkin digunakan untuk internasionalisasi atau lokalisasi.
yarn.lock                  # Menyimpan versi pasti dari dependensi jika menggunakan Yarn sebagai manajer paket.
</pre>
