# 🧑‍💼 Kullanıcı Yönetim Sistemi

Bu proje, bir iş başvurusu kapsamında verilen **“Basit Kullanıcı Yönetim Sistemi”** task’ına çözüm olarak geliştirilmiştir.  
Amacı, kullanıcıların kayıt olup giriş yapabileceği, JWT doğrulamasıyla kimliğinin tanınacağı ve admin'lerin tüm kullanıcıları görüntüleyebileceği basit ama temiz bir kullanıcı yönetim sistemidir.

---

## 📌 Özellikler

### ✅ Backend (FastAPI)

- Kullanıcı kayıt ve login işlemleri
- JWT tabanlı kimlik doğrulama
- Kullanıcı rolleri: `admin`, `user` (Enum)
- `/me`: Login olan kullanıcının profil bilgisi
- `/api/users`: Tüm kullanıcıların listesi (admin yetkisi gerektirir)
- `/api/users/{id}`: Belirli bir kullanıcının detay bilgisi (admin)

### ✅ Frontend (React + Vite)

- JWT token ile giriş yapılabilen bir arayüz
- Kayıt ve giriş ekranı
- Giriş yapan kullanıcı kendi profilini görüntüleyebilir
- Admin kullanıcılar tüm kullanıcıları tablo halinde görüntüleyebilir
- Kullanıcı detaylarına erişilebilir (tıklanabilir satırlar)
- Hatalı rota için 404 sayfası

---

## 🎬 Demo


[🎥 Proje demosunu izlemek için tıklayın](https://drive.google.com/file/d/1owUJ7eqNQbcFBmoHf5aacFrE26CyWKhO/view?usp=sharing)

---

## 🚀 Projeyi Çalıştırmak

### 🛠 Gereksinimler

- Docker  
- Docker Compose  

### 🔧 Kurulum

1. Bu repoyu klonlayın:
   ```bash
   git clone https://github.com/deryayildirimm/user-management-project.git
   cd user-management-project

2. Docker ile projeyi başlatın:
   ```bash
   docker-compose up --build

🎨 Tasarım Notu

Bu proje, işlevsellik ve temiz mimari öncelikli geliştirilmiştir.
Görsel arayüz sade tutulmuştur. Tasarımsal iyileştirmeler ikinci aşamada yapılacaktır.

