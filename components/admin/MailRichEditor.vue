<template>
  <div class="rte">
    <div class="rte-toolbar" role="toolbar" aria-label="Mise en forme">
      <button type="button" class="rte-btn" title="Gras" :class="{ 'rte-btn--on': isActive('bold') }" @mousedown.prevent="cmd('bold')">
        <span class="font-bold">G</span>
      </button>
      <button type="button" class="rte-btn" title="Italique" :class="{ 'rte-btn--on': isActive('italic') }" @mousedown.prevent="cmd('italic')">
        <span class="italic">I</span>
      </button>
      <button type="button" class="rte-btn" title="Souligné" :class="{ 'rte-btn--on': isActive('underline') }" @mousedown.prevent="cmd('underline')">
        <span class="underline">S</span>
      </button>

      <span class="rte-sep" />

      <button type="button" class="rte-btn" title="Petite taille" @mousedown.prevent="setFontSize('2')">A−</button>
      <button type="button" class="rte-btn" title="Taille normale" @mousedown.prevent="setFontSize('3')">A</button>
      <button type="button" class="rte-btn" title="Grande taille" @mousedown.prevent="setFontSize('5')">A+</button>

      <span class="rte-sep" />

      <button type="button" class="rte-btn" title="Liste à puces" @mousedown.prevent="cmd('insertUnorderedList')">••</button>
      <button type="button" class="rte-btn" title="Liste numérotée" @mousedown.prevent="cmd('insertOrderedList')">1.</button>

      <span class="rte-sep" />

      <button type="button" class="rte-btn" title="Insérer un lien" @mousedown.prevent="addLink">
        Lien
      </button>
      <button type="button" class="rte-btn" title="Supprimer le lien" @mousedown.prevent="cmd('unlink')">
        −Lien
      </button>

      <span class="rte-sep" />

      <button type="button" class="rte-btn" title="Effacer la mise en forme" @mousedown.prevent="cmd('removeFormat')">
        ⌫
      </button>
    </div>

    <div
      ref="editorEl"
      class="rte-body"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      :data-placeholder="placeholder"
      @input="onInput"
      @keyup="refreshActive"
      @mouseup="refreshActive"
      @blur="onInput"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  minHeight?: string
}>(), {
  modelValue: '',
  placeholder: 'Écrire le message…',
  minHeight: '160px',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorEl = ref<HTMLDivElement | null>(null)
const active = reactive({
  bold: false,
  italic: false,
  underline: false,
})

function isActive(key: keyof typeof active) {
  return active[key]
}

function refreshActive() {
  if (!import.meta.client) return
  try {
    active.bold = document.queryCommandState('bold')
    active.italic = document.queryCommandState('italic')
    active.underline = document.queryCommandState('underline')
  }
  catch {
    // ignore
  }
}

function cmd(command: string, value?: string) {
  editorEl.value?.focus()
  document.execCommand(command, false, value)
  onInput()
  refreshActive()
}

function setFontSize(size: string) {
  // 1–7 (HTML font size) — 2 petit, 3 normal, 5 grand
  cmd('fontSize', size)
}

function addLink() {
  const url = window.prompt('Adresse du lien (https://…)', 'https://')
  if (!url) return
  const href = /^https?:\/\//i.test(url) ? url : `https://${url}`
  editorEl.value?.focus()
  document.execCommand('createLink', false, href)
  // Forcer ouverture nouvel onglet
  const selection = window.getSelection()
  const node = selection?.anchorNode?.parentElement?.closest('a')
  if (node) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
  onInput()
  refreshActive()
}

function onInput() {
  const html = editorEl.value?.innerHTML || ''
  emit('update:modelValue', html)
}

function setContent(html: string) {
  if (!editorEl.value) return
  const next = html || ''
  if (editorEl.value.innerHTML !== next) {
    editorEl.value.innerHTML = next
  }
}

watch(() => props.modelValue, (v) => {
  if (!editorEl.value) return
  // Évite d'écraser pendant la saisie
  if (document.activeElement === editorEl.value) return
  setContent(v || '')
})

onMounted(() => {
  setContent(props.modelValue || '')
  document.execCommand('defaultParagraphSeparator', false, 'p')
})
</script>

<style scoped>
.rte {
  @apply border-0 bg-white;
}
.rte-toolbar {
  @apply flex flex-nowrap sm:flex-wrap items-center gap-0.5 px-1.5 sm:px-2 py-1.5 border-b border-slate-200 bg-slate-50 overflow-x-auto overscroll-x-contain;
}
.rte-btn {
  @apply min-w-[2rem] h-9 sm:h-8 px-2 rounded-md text-[12px] font-semibold text-slate-600 hover:bg-white hover:text-slate-900 transition-colors flex-shrink-0;
}
.rte-btn--on {
  @apply bg-white text-brand-800 shadow-sm;
}
.rte-sep {
  @apply w-px h-5 bg-slate-200 mx-1;
}
.rte-body {
  @apply px-3 py-3 text-[14px] leading-relaxed text-slate-800 outline-none overflow-y-auto;
  min-height: v-bind(minHeight);
}
.rte-body:empty::before {
  content: attr(data-placeholder);
  @apply text-slate-400 pointer-events-none;
}
.rte-body :deep(a) {
  @apply text-brand-700 underline;
}
.rte-body :deep(ul) {
  @apply list-disc pl-5 my-2;
}
.rte-body :deep(ol) {
  @apply list-decimal pl-5 my-2;
}
.rte-body :deep(p) {
  @apply my-1;
}
</style>
