<template>
  <nav class="flex  justify-between items-center content-center p-2 w-auto border-b border-gray-800">
    <div>logo</div>
    <div>
      <ul class="flex space-x-4xl items-center content-center">
        <li class="flex items-center p-2 hover:bg-dark rounded-md cursor-pointer gap-2 text-size-[14px] font-500">
          <Github size="16"  /> Star on GitHub
        </li>
        <li class="flex items-center p-2 hover:bg-dark rounded-md cursor-pointer gap-2 text-size-[15px] font-500">
          <Sun size="16" /> Light Mode
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { Sun } from 'lucide-vue-next';
import { Github } from 'lucide-vue-next';

</script>
