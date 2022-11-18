<script>
import { defineComponent, shallowRef } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // use shallowRef to remove unnecessary optimizations
    const currentIcon = shallowRef('')

    import(`../icons/icon-${props.name}.vue`).then(val => {
      // val is a Module has default
      currentIcon.value = val.default
    })

    return {
      currentIcon
    }
  },
  // should be here or insert setup?
  watchEffect(() => {
    import(`../icons/icon-${props.name}.vue`).then(val => {
        currentIcon.value = val.default
    })
    })
    /*  -- define the component to empty if isShow is false
    ,
  components:{
        MyComponent:defineAsyncComponent(() => import("./DynamicComponent.vue"))
        },
        setup(){
        const isShow = ref(false);
        const name = computed (() => isShow.value ? 'MyComponent': '')

        const onClick = () => {
            isShow.value = true;
        }
        } */

})
</script>

<template>
    <svg v-if="currentIcon" width="100%" viewBox="0 0 24 24" :aria-labelledby="name">
      <component :is="currentIcon" />
    </svg>
</template>