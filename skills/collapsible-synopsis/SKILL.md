# Collapsible Synopsis

## Ne zaman kullanılır?
- Uzun açıklama metni sayfayı aşırı uzatıyorsa
- İlk görünümde daha kontrollü bir içerik alanı isteniyorsa

## Ana hedef
Synopsis / prose bloğunu ilk yüklemede kontrollü yükseklikte gösterip expand/collapse ile yönetmek.

## Uygulama yaklaşımı
- İçerik rich HTML olabilir, bunu bozma
- İlk durumda max-height veya line clamp uygula
- Altta gradient fade ile içerik devam ediyor hissi ver
- Buton ile expand/collapse sağla

## Dikkat
- Kısa içerikte expand butonu çıkmasın
- HTML/prose formatı bozulmasın
- Accessibility düşün: button semantic olsun
- İçerik açıldığında layout stabil kalsın

## Tercih
Öncelik: expand/collapse.
Sadece zorunluysa iç scroll düşün.
