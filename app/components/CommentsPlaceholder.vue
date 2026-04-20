<script setup lang="ts">
const mock = [
  { name: 'Emre Y.', date: '2 gün önce', text: 'Kimetsu no Yaiba\'ın animasyon kalitesi gerçekten çok iyi, ufotable her zamanki gibi harika iş çıkarmış.' },
  { name: 'Selin K.', date: '4 gün önce', text: 'Tanjirou karakteri çok iyi yazılmış. Kardeşine olan bağlılığı etkileyici.' },
  { name: 'Berk A.', date: '1 hafta önce', text: 'Savaş sahneleri görsel olarak çok etkileyici. Aksiyon anime sevenler için birebir.' },
]
</script>

<template>
  <section>
    <h2 class="text-lg font-semibold mb-3">Yorumlar</h2>
    <ul class="space-y-2">
      <li
        v-for="c in mock"
        :key="c.name"
        class="p-3 rounded-lg bg-card border border-border"
      >
        <div class="flex items-center justify-between mb-1">
          <div class="font-medium text-xs">{{ c.name }}</div>
          <div class="text-[11px] text-muted-foreground">{{ c.date }}</div>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed">{{ c.text }}</p>
      </li>
    </ul>
  </section>
</template>
