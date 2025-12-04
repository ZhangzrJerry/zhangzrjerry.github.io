<template>
  <div class="go">
    <div class="box">
      <h2>即将跳转到外部链接</h2>
      <p class="url">{{ target }}</p>
      <a :href="target" rel="noopener noreferrer" target="_blank" class="btn" data-skip-go>立即前往</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'

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
  const isExternal = /^[a-z]+:\/\//i.test(final)
  if (isExternal) {
    try {
      window.location.replace(final)
    } catch {
      window.location.href = final
    }
  } else {
    const router = useRouter()
    router.go(final)
  }
})
</script>

<style scoped>
.go { display: grid; place-items: center; min-height: 40vh; }
.box { border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; background: var(--vp-c-bg-soft); display: grid; gap: 12px; }
.url { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; word-break: break-all; color: var(--vp-c-text-2); }
.btn { display: inline-block; padding: 8px 12px; border: 1px solid var(--vp-c-brand-1); color: var(--vp-c-brand-1); border-radius: 8px; text-decoration: none; }
.btn:hover { background: var(--vp-c-brand-1); color: white; }
</style>
