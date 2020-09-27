<template>
  <li>
  <span>{{data.date}}</span>
  <span>{{data.time}}</span>
  <span v-if="data.isAvaible">Svobodno</span>
  <span>{{data.Name}}</span>
  <span>{{data.Phone}}</span>
  <button>Clear</button>
  <button>Remove</button>
  </li>
</template>

<script>

export default {
    name: 'AdminDataItem',
    props: ['data'],

}
</script>