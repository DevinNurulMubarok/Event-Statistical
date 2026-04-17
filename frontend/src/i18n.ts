import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "profile": {
        "title": "Basic Profile",
        "subtitle": "Manage your public identity information",
        "name": "Full Name",
        "name_placeholder": "Enter your name",
        "email": "Email Address",
        "language": "System Language",
        "save_btn": "Save Changes",
        "saving": "Saving...",
        "success": "Profile updated successfully!",
        "error": "Failed to update profile",
        "logout_btn": "Log Out Session"
      },
      "tabs": {
        "profile": "Basic Profile",
        "security": "Security",
        "referral": "Referral",
        "points": "Points"
      },
      "security": {
        "title": "Account Security",
        "password": "Password",
        "password_desc": "Change your password periodically",
        "change_btn": "Change",
        "personalization": "Personalization",
        "theme": "App Theme",
        "theme_desc": "Choose your favorite look",
        "light": "Light",
        "dark": "Dark"
      },
      "referral": {
        "title": "Friends Program",
        "subtitle": "Share happiness and get exclusive rewards.",
        "your_code": "Your Code",
        "copy_btn": "Copy Code"
      },
      "points": {
        "title": "Your Points",
        "desc": "Points are automatically credited every transaction",
        "history_placeholder": "History will appear here"
      },
      "navbar": {
        "home": "Home",
        "events": "Events",
        "profile": "Profile"
      }
    }
  },
  id: {
    translation: {
      "profile": {
        "title": "Profil Dasar",
        "subtitle": "Kelola informasi identitas publik Anda",
        "name": "Nama Lengkap",
        "name_placeholder": "Masukkan nama Anda",
        "email": "Alamat Email",
        "language": "Bahasa Sistem",
        "save_btn": "Simpan Perubahan",
        "saving": "Menyimpan...",
        "success": "Profil berhasil diperbarui!",
        "error": "Gagal memperbarui profil",
        "logout_btn": "Keluar Sesi"
      },
      "tabs": {
        "profile": "Profil Dasar",
        "security": "Keamanan",
        "referral": "Referral",
        "points": "Poin"
      },
      "security": {
        "title": "Keamanan Akun",
        "password": "Kata Sandi",
        "password_desc": "Ubah kata sandi secara berkala",
        "change_btn": "Ubah",
        "personalization": "Personalisasi",
        "theme": "Tema Aplikasi",
        "theme_desc": "Pilih tampilan favorit Anda",
        "light": "Terang",
        "dark": "Gelap"
      },
      "referral": {
        "title": "Program Teman",
        "subtitle": "Bagikan kebahagiaan dan dapatkan hadiah eksklusif.",
        "your_code": "Kode Anda",
        "copy_btn": "Salin Kode"
      },
      "points": {
        "title": "Poin Anda",
        "desc": "Poin dikreditkan otomatis setiap transaksi",
        "history_placeholder": "Riwayat akan muncul di sini"
      },
      "navbar": {
        "home": "Beranda",
        "events": "Event",
        "profile": "Profil"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "id",
    fallbackLng: "id",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
