<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()
const toast = useToast()

onBeforeMount(() => {
  const { s, f } = router.currentRoute.value.query
  if (s)
    toast.add({ title: s.toString(), color: 'green' })

  else if (f)
    toast.add({ title: f.toString(), color: 'red' })
  router.push('/')
})
</script>

<template>
  <div />
</template>
