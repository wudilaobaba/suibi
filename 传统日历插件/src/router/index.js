import Recommend from 'components/recommend/recommend.vue'
import Rank from 'components/rank/rank.vue'
import Singer from 'components/singer/singer.vue'
import Search from 'components/search/search.vue'
export default [{
    name: 'recommend',
    path: '/recommend',
    component: Recommend
  },
  {
    name: 'rank',
    path: '/rank',
    component: Rank
  },
  {
    name: 'singer',
    path: '/singer',
    component: Singer
  },
  {
    name: 'search',
    path: '/search',
    component: Search
  },
  {
    path: '/',
    redirect: '/recommend'
  }
]
