import { createRouter, createWebHistory } from 'vue-router'
import CharactersList from '@/views/CharactersList.vue'
import CharacterDetails from '@/views/CharacterDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/characters',
      name: 'characters-list',
      component: CharactersList
    },
    {
      path: '/character/:id',
      name: 'character-details',
      component: CharacterDetails,
      beforeEnter: (to, from, next) => {
        if (to.params.id) {
          next()
        } else {
          next({ name: 'characters-list' })
        }
      }
    },
    { path: '/:pathMatch(.*)', redirect: { name: 'characters-list' } }
  ]
})

export default router
