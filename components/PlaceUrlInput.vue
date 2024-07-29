<template>
  <form @submit.prevent="handleSubmit" class="flex gap-10 flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-size-6xl text-balance font-900"><span class="generate">Generate</span> and <span
          class="preview">preview</span> <br>
        Open <span class="graph">Graph</span>
      </h1>
    </div>
    <div class="relative w-xl">
      <input type="text" v-model="url"
        class="px-4 w-full py-2 border border-gray-800 text-white bg-neutral-900 rounded-md focus:outline-none"
        placeholder="https://linu.dev/" />
      <button type="submit"
        class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 bg-transparent border-none p-0">
        <Search />
      </button>
    </div>
  </form>
</template>

<script setup>
import { Search } from 'lucide-vue-next';

const url = ref('');
const router = useRouter();

const { setMetadata, metadata } = useMetadata();

const handleSubmit = async () => {
  try {
    const fetchedMetadata = await $fetch(`/api/extract-metadata?url=${encodeURIComponent(url.value)}`);
    setMetadata(fetchedMetadata);
    if (metadata.value) {
      router.push('/opengraph');
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
    setMetadata(null);
  }
};
</script>

<style scoped>
.generate {
  color: #F43737;
  background-image: -webkit-linear-gradient(315deg, #F43737 42%, #0019FF 86%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.preview {
  color: #F43737;
  background-image: -webkit-linear-gradient(180deg, #F43737 42%, #0019FF 86%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.graph {
  color: #F43737;
  background-image: -webkit-linear-gradient(135deg, #F43737 42%, #0019FF 86%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>