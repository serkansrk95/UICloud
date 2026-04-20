# Component Contracts

## Episode Navigator
### Input
- episodes[] listesi
- currentEpisodeNumber veya currentEpisodeSlug
- totalEpisodes
- optional watched episode set / available episode set

### Beklenen davranış
- episodes listesi 100'lü range'lere ayrılabilmeli
- selected range değiştiğinde grid güncellenmeli
- arama kutusuna episode numarası girilince ilgili episode görünür veya vurgulanmalı
- mevcut aktif bölüm belirgin olmalı

## Character Grid
### Input
- characters[] listesi

### Beklenen davranış
- varsayılan görünüm 2 satır
- expand ile tam liste
- 2 satır mantığı CSS ve grid'e göre bozulmamalı

## Synopsis Collapse
### Input
- rich HTML / prose içerik

### Beklenen davranış
- ilk yükseklik sınırlandırmalı görünüm
- içerik kesildiği anlaşılmalı
- expand/collapse düzgün çalışmalı
