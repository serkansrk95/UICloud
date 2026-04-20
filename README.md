# Claude Anime Detail Page Redesign Kit

Bu paket, mevcut anime detay sayfasını hedeflenen yeni düzene geçirmek için Claude'a net görev, kural, skill ve komut seti verir.

## Hedef
- Sol taraftaki mevcut **Bölümler** bölümünü kaldırmak
- Sağ üst tarafa yeni **100'lü blok sistemli episode navigator** yerleştirmek
- **Karakterler** bölümünü başlangıçta **2 satır** ile sınırlamak ve expand eklemek
- Uzun açıklama/yazı alanını **collapse + expand** mantığına geçirmek
- Mevcut koyu tema, kart yapısı ve görsel dil bozulmadan ilerlemek

## İçerik
- `CLAUDE.md` → Ana çalışma rehberi
- `PROJECT_CONTEXT.md` → İstek özeti ve bağlam
- `rules/` → Katı uygulama kuralları
- `skills/` → Görev bazlı skill dosyaları
- `.claude/commands/` → Claude'a verilebilecek hazır komut promptları
- `docs/` → Plan, kabul kriterleri, uygulama sırası
- `references/` → Mevcut layout ve yeni bölüm bloğu referansları
- `prompts/` → Kopyala-yapıştır hazır görev promptları

## Kullanım
1. Bu klasörü proje köküne koy.
2. Claude'a önce `CLAUDE.md` ve `PROJECT_CONTEXT.md` dosyalarını dikkate almasını söyle.
3. Ardından `.claude/commands/implement-anime-detail-redesign.md` içeriğini çalıştır.
4. Gerekirse inceleme için `.claude/commands/review-anime-detail-redesign.md` kullan.

## Beklenen Claude çalışma tarzı
- Önce ilgili sayfa/component dosyalarını bulsun
- Sonra hangi dosyaları değiştireceğini kısa planla söylesin
- En az müdahale ile düzenlemeyi yapsın
- Tasarım temasını bozmasın
- Çıktıda şu formatı kullansın:
  - Değişen dosyalar
  - Yapılan değişiklikler
  - Kalan riskler
  - Hızlı test notları
