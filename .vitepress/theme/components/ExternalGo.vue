<template>
  <div class="nf">
    <div class="code">REDIRECT</div>
    <div class="title">即将跳转到外部链接</div>
    <div class="quote">{{ target }}</div>
    <div class="actions">
      <a :href="target" rel="noopener noreferrer" target="_blank" class="btn" data-skip-go>继续访问</a>
      <a href="/" class="btn secondary" data-skip-go>返回首页</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const target = ref('')

const normalize = (raw: string) => {
  const s = raw.trim().replace(/^['"`]+|['"`]+$/g, '')
  if (!s) return ''
  if (s.startsWith('mailto:') || s.startsWith('tel:') || s.startsWith('javascript:')) return s
  if (s.startsWith('//')) return 'https:' + s
  if (/^[a-z]+:\/\//i.test(s)) return s
  if (s.startsWith('/')) return s
  if (/^(www\.)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(s)) return 'https://' + s
  return s
}

onMounted(() => {
  const u = new URL(window.location.href)
  const t = u.searchParams.get('to') || ''
  const final = normalize(t)
  target.value = final
  if (!final) return
  try {
    window.location.assign(final)
  } catch {
    window.location.href = final
  }
})
</script>

<style scoped>
.nf { min-height: 60vh; display: grid; place-items: center; text-align: center; gap: 12px; }
.code { font-size: 4rem; font-weight: 900; line-height: 1; color: var(--vp-c-brand-1); }
.title { font-size: 1.2rem; color: var(--vp-c-text-1); font-weight: 600; }
.quote { max-width: 720px; color: var(--vp-c-text-2); word-break: break-all; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
.actions { display: flex; gap: 8px; justify-content: center; }
.btn { display: inline-block; margin-top: 8px; padding: 10px 14px; border: 1px solid var(--vp-c-brand-1); color: var(--vp-c-brand-1); border-radius: 8px; text-decoration: none; }
.btn:hover { background: var(--vp-c-brand-1); color: white; }
.btn.secondary { border-color: var(--vp-c-divider); color: var(--vp-c-text-1); }
.btn.secondary:hover { background: var(--vp-c-bg-soft); }
</style>
