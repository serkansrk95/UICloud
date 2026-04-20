Anime detail sayfasını mevcut yapıyı koruyarak refactor et.

Önce:
1. Bu repoda anime detail page'i oluşturan route/page/component dosyalarını bul.
2. Episodes, characters, synopsis ve related anime bloklarının hangi dosyalarda render edildiğini tespit et.
3. Değiştireceğin dosyaları kısa bir plan olarak yaz.

Sonra şu değişiklikleri uygula:
- Sol ana içerik akışındaki mevcut **Bölümler** section'ını tamamen kaldır.
- Sağ sidebar'ın üstüne yeni bir **episode navigator** ekle.
- Bu yeni navigator, referans yapıya uygun olarak:
  - 100'lü blok sistemi
  - range dropdown (`EPS: 001-100`)
  - episode number search
  - numaralı grid
  mantığıyla çalışsın.
- Mevcut related anime kartı/bloğu yeni episode navigator'ın altında kalsın.
- **Karakterler** bölümünü başlangıçta yalnızca **2 satır** gösterecek şekilde sınırla.
- Karakterler için expand/collapse mantığı ekle.
- Uzun açıklama/synopsis/prose alanını kontrollü yükseklikte başlat.
- Bu alana gradient fade + expand/collapse mantığı ekle.
- Mevcut koyu tema, kart stili, border/radius/hover davranışları korunsun.
- Gereksiz refactor ve unrelated cleanup yapma.

Teslim formatı:
1. İncelenen dosyalar
2. Değiştirilen dosyalar
3. Yapılan değişiklikler
4. Test checklist
5. Kalan riskler
