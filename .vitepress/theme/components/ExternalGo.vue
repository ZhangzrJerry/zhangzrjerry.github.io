<template>
  <div class="NotFound">
    <!-- <p class="code">REDIRECT</p> -->
    <h1 class="title">即将跳转到外部链接</h1>
    <div class="divider" />
    <blockquote class="quote">{{ target }}</blockquote>
    <div class="action">
      <a class="link" :href="target" rel="noopener noreferrer" target="_blank" data-skip-go>继续访问</a>
      <a class="link home" href="/" data-skip-go>返回首页</a>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const target = ref('')

const normalize = (raw: string) => {
  const s = decodeURIComponent(raw).trim().replace(/^['"`]+|['"`]+$/g, '')
  if (!s) return ''
  if (s.startsWith('mailto:') || s.startsWith('tel:') || s.startsWith('javascript:')) return s
  if (s.startsWith('//')) return 'https:' + s
  if (/^[a-z]+:\/\//i.test(s)) return s
  if (s.startsWith('/')) return s
  if (/^(www\.)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(s)) return 'https://' + s
  if (!s.includes('://') && s.includes('.')) return 'https://' + s
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
.NotFound { padding: 64px 24px 96px; text-align: center; }
@media (min-width: 768px) { .NotFound { padding: 96px 32px 168px; } }
.code { line-height: 64px; font-size: 64px; font-weight: 600; }
.title { padding-top: 12px; letter-spacing: 2px; line-height: 20px; font-size: 20px; font-weight: 700; }
.divider { margin: 24px auto 18px; width: 64px; height: 1px; background-color: var(--vp-c-divider); }
.quote { margin: 0 auto; max-width: 560px; font-size: 14px; font-weight: 500; color: var(--vp-c-text-2); word-break: break-all; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
.action { padding-top: 20px; display: flex; gap: 8px; justify-content: center; }
.link { display: inline-block; border: 1px solid var(--vp-c-brand-1); border-radius: 16px; padding: 3px 16px; font-size: 14px; font-weight: 500; color: var(--vp-c-brand-1); transition: border-color 0.25s, color 0.25s; text-decoration: none; }
.link:hover { border-color: var(--vp-c-brand-2); color: var(--vp-c-brand-2); }
.home { border-color: var(--vp-c-divider); color: var(--vp-c-text-1); }
.home:hover { border-color: var(--vp-c-text-2); color: var(--vp-c-text-2); }
</style>
