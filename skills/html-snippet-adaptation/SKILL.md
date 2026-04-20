# HTML Snippet Adaptation

## Ne zaman kullanılır?
- Dışarıdan referans HTML verildiğinde
- Başka bir siteden alınmış yapı mevcut projeye uyarlanacaksa

## Ana hedef
Referans HTML'i mevcut uygulamanın tasarım sistemine ve component mantığına uygun hale getirmek.

## Kurallar
- Raw sınıf dump yapma
- Var olan design token'ları kullan
- Aynı işi yapan mevcut component varsa onu tercih et
- Gerekirse sadece yapısal mantığı taşı, birebir markup kopyalama

## Bu görevde özel not
Episode navigator referansı başka bir yapıya ait olabilir.
Buradaki iş:
- referansın bilgi mimarisini almak
- görünüm mantığını korumak
- mevcut stack'e uygun, temiz bir versiyon üretmek
