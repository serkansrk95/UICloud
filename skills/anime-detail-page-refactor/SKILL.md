# Anime Detail Page Refactor

## Ne zaman kullanılır?
- Anime detay sayfasında büyük bölüm yerleşim değişimi isteniyorsa
- Sol ve sağ içerik bloklarının görevleri yeniden düzenlenecekse
- Mevcut sayfa korunarak yapısal iyileştirme yapılacaksa

## Amaç
Mevcut anime detail sayfasını, tasarım dilini bozmadan daha derli toplu hale getirmek.

## Bu görevde zorunlu hedefler
- Sol taraftaki eski episodes bölümünü kaldır
- Sağ üstte yeni episode navigator alanı kur
- Characters için 2 satır + expand mantığı uygula
- Synopsis için collapse + expand mantığı uygula

## Çalışma sırası
1. İlgili page/component dosyasını bul
2. Veri akışlarını tespit et
3. Layout'u yeniden kur
4. Yeni episode navigator'ı bağla
5. Characters ve synopsis behavior ekle
6. Regression kontrolü yap

## Dikkat
- Bu iş yeni bir sayfa yazmak değildir
- Gereksiz component patlaması yapma
- Mevcut veri yapısını bozma
- Sağ sidebar düzenini tutarlı kur

## Teslim kontrolü
- Sağ üstte episode navigator var mı?
- Sol akıştan episodes gitti mi?
- Karakterler kısa başlıyor mu?
- Synopsis kısa başlıyor mu?
