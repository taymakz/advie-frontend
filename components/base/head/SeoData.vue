<script setup lang="ts">
import type { SeoData } from '~/models/website/SeoData'

defineProps<{
  seoData: SeoData
}>()
</script>

<template>
  <Head>
    <Title v-text="seoData.title" />
    <Meta property="og:title" :content="seoData.title" />
    <Meta name="description" :content="seoData.description" />
    <Meta property="og:description" :content="seoData.description" />
    <Meta property="og:image" :content="seoData.ogImage" />
    <Meta property="og:url" :content="seoData.ogUrl" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="seoData.twitterTitle" />
    <Meta name="twitter:description" :content="seoData.twitterDescription" />
    <Meta name="twitter:image" :content="seoData.twitterImage" />
    <Meta name="twitter:card" :content="seoData.twitterCard" />
    <Link rel="canonical" :href="seoData.canonical" />
    <Meta :content="seoData.indexPage ? 'index , follow' : 'noindex , nofollow'" name="robots" />
    <slot />
  </Head>
</template>
