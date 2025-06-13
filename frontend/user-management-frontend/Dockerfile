# 1. Node.js imajını kullan
FROM node:18-alpine AS build

# 2. Proje klasörünü çalışma dizini yap
WORKDIR /usr/src/app

# 3. package.json ve lock dosyasını kopyala
COPY package*.json ./

# NPM mirror (geçici sorunlara karşı)
RUN npm config set registry https://registry.npmmirror.com

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Diğer tüm dosyaları kopyala (src, public vs.)
COPY . .

# 6. Projeyi build et (vite ile dist klasörü oluşur)
RUN npm run build

# 7. Nginx imajına geç
FROM nginx:alpine

# 8. dist klasörünü nginx'in public klasörüne kopyala
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# 9. Portu aç
EXPOSE 80

# 10. Nginx’i başlat
CMD ["nginx", "-g", "daemon off;"]
