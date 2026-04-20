# Change Plan

## Aşama 1 — Mevcut yapıyı bul
- Anime detail route/page dosyasını tespit et
- Episodes listesi nerede render ediliyor bul
- Characters listesi nerede render ediliyor bul
- Synopsis/prose alanı nerede render ediliyor bul
- Sağ sidebar / related anime alanı nerede render ediliyor bul

## Aşama 2 — Layout refactor
- Ana grid'i mevcut ihtiyaçlara göre güncelle
- Sağ kolonu episode navigator için yeterli hale getir
- Sol ana akıştan eski episode bölümünü kaldır

## Aşama 3 — Yeni episode navigator
- Sağ üstte yeni bir card/block oluştur
- Mevcut episode datasını bu yeni yapıya bağla
- Range switch ve episode quick search mantığını ekle
- Current / selected / watched / available state tasarımını netleştir

## Aşama 4 — Characters collapse
- Varsayılan görünümü 2 satır ile sınırla
- Expand/collapse state ekle
- Layout kırılmadan tam liste açılabilsin

## Aşama 5 — Synopsis collapse
- İlk yükseklik sınırı uygula
- Gradient fade ekle
- Daha Fazla Oku / Daha Az Göster ekle

## Aşama 6 — Regression kontrolü
- Comments bozuldu mu kontrol et
- Related anime halen sağ tarafta düzgün mü kontrol et
- Mobile'da kolonlar tek akışa düşüyor mu kontrol et
- Duplicate episode render kaldı mı kontrol et
