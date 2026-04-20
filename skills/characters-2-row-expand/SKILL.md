# Characters 2 Row Expand

## Ne zaman kullanılır?
- Karakter listesi çok uzadığı için sayfayı aşağı itiyorsa
- İlk görünüm kontrollü tutulmak isteniyorsa

## Ana hedef
Karakter listesini başlangıçta 2 satır ile sınırla ve kullanıcı isterse tamamını göster.

## Uygulama yaklaşımı
- Mevcut grid kolon sayısını baz al
- Collapse durumunda yalnızca 2 satır gösterecek yükseklik / görünür item sayısı kullan
- Expand ile tüm grid açılmalı
- Collapse ile eski haline dönmeli

## Dikkat
- Karakter sayısı azsa expand butonu gösterme
- Grid kırılmasın
- Kart ölçüleri bozulmasın
- Ani layout jump etkisini azalt

## İyi çözüm
- `showAllCharacters` gibi tek state
- visible count veya CSS max-height mantığı
- buton metni sade: `Daha Fazla Göster` / `Daha Az Göster`
