<script setup lang="ts" generic="T">

defineProps<{
    items: T[];
    active: T
}>()

defineEmits<{
    update: [value: T]
}>()

</script>