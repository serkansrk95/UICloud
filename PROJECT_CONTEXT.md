# PROJECT_CONTEXT.md

## Görev Özeti
Mevcut anime detay sayfasında bazı bölümler yanlış yerde veya fazla uzun kullanılıyor.
İstenen şey mevcut düzeni aşağıdaki şekilde yeniden kurmak:

### 1) Episodes / Bölümler
- Şu an solda, ana içerik akışının içinde duran bölüm kaldırılacak.
- Bunun yerine sağ üst tarafa yeni bir episode navigation modülü gelecek.
- Bu modül:
  - 100'lü blok sistemi
  - hızlı filtre / range seçici
  - episode number search
  - grid halinde episode seçimleri
  mantığı ile çalışacak.

### 2) Karakterler
- Tüm karakterlerin uzun uzun görünmesi istenmiyor.
- Başlangıçta sadece **2 satır** görünmeli.
- Kalan karakterler için expand/collapse mantığı eklenmeli.

### 3) Yazı / Açıklama
- Mevcut metin alanı çok aşağı taşıyor.
- Controlled height isteniyor.
- Collapse + expand veya kontrollü scroll mantığı uygun.
- Öncelik: temiz görünüm + fazla aşağı sarkmama.

## Tasarım Amacı
- Sayfa daha derli toplu olmalı
- Episode erişimi daha görünür ve daha güçlü olmalı
- İçerik blokları daha kısa ve kontrollü görünmeli
- Mevcut tema ve koyu arayüz korunmalı

## Teknik Niyet
Bu iş sadece görsel değil; bileşen yerleşimi ve interaction mantığı da içeriyor.
Bu yüzden Claude:
- mevcut data source'u korumalı
- mevcut utility class yaklaşımını bozmamalı
- gerekiyorsa yeni component çıkarmalı
- ama gereksiz büyük mimari değişiklik yapmamalı
