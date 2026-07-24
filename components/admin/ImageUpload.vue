<template>
  <div>
    <label v-if="label" class="admin-label">{{ label }}{{ required ? ' *' : '' }}</label>

    <div
      class="relative border-2 border-dashed rounded-[4px] transition-colors overflow-hidden"
      :class="dragOver ? 'border-brand-600 bg-brand-50' : 'border-gray-200 bg-gray-50 hover:border-brand-400'"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="onDrop"
    >
      <input
        ref="inputRef"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        class="sr-only"
        @change="onInput"
      >

      <div v-if="modelValue" class="relative">
        <img
          :src="modelValue"
          alt="Aperçu"
          class="w-full object-cover object-top"
          :class="previewClass"
        >
        <div class="absolute inset-0 bg-brand-900/0 hover:bg-brand-900/40 transition-colors flex items-center justify-center gap-2 opacity-100 sm:opacity-0 sm:hover:opacity-100">
          <button type="button" class="px-4 py-2 bg-white text-brand-800 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" @click="pick">
            Changer
          </button>
          <button type="button" class="px-4 py-2 bg-red-50 text-red-600 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" @click="clear">
            Retirer
          </button>
        </div>
      </div>

      <button
        v-else
        type="button"
        class="w-full px-6 py-10 text-center"
        :disabled="uploading"
        @click="pick"
      >
        <span class="block text-brand-700 font-[900] text-[13px] uppercase tracking-wider mb-2">
          {{ uploading ? 'Envoi en cours...' : 'Choisir une image' }}
        </span>
        <span class="block text-gray-400 text-[12px] font-medium">
          Glissez-déposez ou cliquez · JPG, PNG, WebP · max 8 Mo
        </span>
      </button>
    </div>

    <div v-if="modelValue" class="flex gap-2 mt-3 sm:hidden">
      <button type="button" class="px-4 py-2 bg-gray-100 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" @click="pick">
        Changer
      </button>
      <button type="button" class="px-4 py-2 bg-red-50 text-red-600 text-[11px] font-[900] uppercase tracking-wider rounded-[2px]" @click="clear">
        Retirer
      </button>
    </div>

    <p v-if="uploadError" class="text-red-600 text-sm font-medium mt-2">{{ uploadError }}</p>
    <p v-if="hint" class="text-gray-400 text-xs font-medium mt-2">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  required?: boolean
  hint?: string
  previewClass?: string
}>(), {
  label: 'Image',
  required: false,
  hint: '',
  previewClass: 'max-h-56',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const uploading = ref(false)
const uploadError = ref('')
const dragOver = ref(false)

function pick() {
  inputRef.value?.click()
}

function clear() {
  emit('update:modelValue', '')
  if (inputRef.value) inputRef.value.value = ''
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) upload(file)
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) upload(file)
}

async function upload(file: File) {
  uploadError.value = ''
  if (!file.type.startsWith('image/')) {
    uploadError.value = 'Veuillez sélectionner une image.'
    return
  }
  uploading.value = true
  try {
    const body = new FormData()
    body.append('file', file)
    const res = await $fetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body,
    })
    emit('update:modelValue', res.url)
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } }
    uploadError.value = err.data?.statusMessage || 'Échec de l\'envoi de l\'image.'
  }
  finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.admin-label {
  @apply block text-[11px] font-[900] text-gray-500 uppercase tracking-widest mb-2;
}
</style>
