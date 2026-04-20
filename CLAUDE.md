# CLAUDE.md

Bu repo içinde çalışırken ana hedef, mevcut anime detay sayfasını istenen yeni düzene çevirmektir.

## Proje Kimliği
Bu görev bir **tasarım düzenleme / layout refactor** işidir.
Amaç tamamen yeni bir sayfa yapmak değil; mevcut sayfanın doğru bölümlerini taşıyıp yeniden organize etmektir.

## Ana Hedefler
1. Sol içerikte duran mevcut **Bölümler** listesini tamamen kaldır.
2. Sağ üst tarafa yeni **episode navigator** bileşeni ekle.
3. Bu yeni episode alanı:
   - 100'lü blok mantığına sahip olsun
   - aralık seçici (ör. `EPS: 001-100`) içersin
   - episode numarasına göre hızlı arama içersin
   - grid bazlı numara görünümü kullansın
4. Sağ tarafta mevcut related/ilgili anime kartı varsa yeni episode navigator'ın altında kalsın.
5. Karakterler bölümü başlangıçta **2 satır** ile sınırlı olsun.
6. Karakterler için `Daha Fazla Göster / Daha Az Göster` mantığı ekle.
7. Uzun açıklama / synopsis / prose alanı çok aşağı sarkmasın.
8. Yazı alanında collapse + gradient fade + expand/collapse mantığı kullan.
9. Mevcut koyu tema, spacing, radius, border ve hover dili korunmalı.
10. Gereksiz rearchitecture, data model değişikliği veya unrelated cleanup yapma.

## Öncelik Sırası
1. Layout yerleşimi doğru olsun
2. Episode navigator sağ üstte doğru dursun
3. Eski episodes bölümü kaldırılmış olsun
4. Character collapse doğru çalışsın
5. Synopsis collapse doğru çalışsın
6. Mobil ve desktop kırılmasın

## Uygulama Şekli
- Önce anime detail sayfasını oluşturan route/page/component'i bul.
- Episode datasının şu an nasıl beslendiğini tespit et.
- Yeni sağ sidebar bileşenini mevcut veriyle çalışacak şekilde entegre et.
- Gerekirse ayrı component çıkar ama gereksiz parçalama yapma.
- Dışarıdan gelen referans HTML'i birebir kopyalamak yerine mevcut stack'e uygun hale getir.
- Mevcut design token'ları ve utility class düzenini koru.

## Tasarım Dili
- Koyu tema korunacak
- Ana kartlar `bg-card / border-border / rounded-lg/2xl` mantığında kalacak
- Aşırı parlak yeni renkler eklenmeyecek
- Mevcut accent/primary tonu korunacak
- Sağdaki yeni episode alanı sayfadan bağımsız görünmeyecek; aynı ürün ailesine ait gibi durmalı

## Yasaklar
- Sol içerikte ikinci bir episode bölümü bırakma
- Aynı veriyi iki farklı yerde göstermeye devam etme
- Bütün sayfayı yeniden yazma
- Mevcut çalışan yorum alanını bozma
- Sadece masaüstü düşünerek çözüm üretme
- Raw referans HTML/CSS'i uyarlamadan dump etme

## İstenen Çıktı Formatı
Claude cevap verirken şu sırayı kullansın:
1. İncelenen dosyalar
2. Değiştirilecek dosyalar
3. Uygulama planı
4. Yapılan değişiklikler
5. Hızlı test listesi
6. Kalan riskler

## Başarı Ölçütü
Başarı; sayfa açıldığında:
- sağ üstte yeni episode navigator'ın görünmesi,
- soldaki eski episodes bölümünün gitmesi,
- karakterlerin kontrollü yükseklikte olması,
- açıklama alanının sayfayı gereksiz uzatmaması
ile ölçülür.
