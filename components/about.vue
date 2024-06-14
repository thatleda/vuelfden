<template>
    <SanityImage :asset-id="data[0].banner.asset._ref" width="50" height="50"></SanityImage>
    <SanityContent :blocks="data[0].content" />
</template>

<script setup>
const query = groq`*[_type == "page" && slug.current == $slug][0..10]`
const {data} = useSanityQuery(query, {slug: "who"})
console.log(data)
</script>