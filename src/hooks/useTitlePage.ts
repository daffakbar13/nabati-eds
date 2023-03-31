import { useRouter } from 'next/router'
import { useTitle } from './useTitle'

type TitleType = 'list' | 'create' | 'detail' | 'edit' | 'order-again'

export default function useTitlePage(type: TitleType) {
  const router = useRouter()
  const title = useTitle()
  const id = router.query.id || ''

  switch (type) {
    case 'create':
      return `Create New ${title}`

    case 'detail':
      return `View ${title} ${id}`

    case 'edit':
      return `${title} ${id}`

    case 'order-again':
      return `Order Again from ${title} ${id}`

    case 'list':
      return title

    default:
      return ''
  }
}
