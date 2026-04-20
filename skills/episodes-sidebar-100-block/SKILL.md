# Episodes Sidebar 100 Block

## Ne zaman kullanılır?
- Bölümler listesi standart kart listesinden daha gelişmiş bir navigator'a çevrilecekse
- Sağ sidebar'da episode gezinme deneyimi güçlendirilecekse

## Ana hedef
Episodes datasını, 100'lü blok mantığıyla çalışan güçlü bir sidebar navigator'a dönüştürmek.

## Zorunlu özellikler
- Üstte başlık / label
- Range seçici (`EPS: 001-100` gibi)
- Episode number search input
- Numaralı grid
- Active state
- Available / filled / current state ayrımı
- Geniş seri senaryolarında çoklu range desteği

## Uygulama notları
- Referans HTML doğrudan dump edilmemeli
- Mevcut framework/component stiline çevrilmeli
- Episode datası varsa ondan range türet
- Hardcode sayıları veri yoksa sadece UI demo için kullanma; mümkün olduğunca veri bazlı çalış

## UX ilkeleri
- Current episode en belirgin state olsun
- Hover state net olsun
- Arama kutusu hızlı ve sade çalışsın
- Grid dar alanda da okunabilir kalsın

## Kabul kontrolü
- Yeni yapı sağ tarafta mı?
- Eski episodes bölümü tamamen kaldırıldı mı?
- 100+ bölüm olan senaryoda range mantığı çalışıyor mu?
