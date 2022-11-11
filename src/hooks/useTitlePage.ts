import { useRouter } from 'next/router'
import { useTitle } from './useTitle'

type TitleType = 'list' | 'create' | 'detail' | 'edit' | 'order-again'

export default function useTitlePage(type: TitleType) {
  const router = useRouter()
  const title = useTitle()

  switch (type) {
    case 'create':
      return `Create New ${title}`

    case 'detail':
      return `View ${title} ${router.query.id}`

    case 'edit':
      return `${title} ${router.query.id}`

    case 'order-again':
      return `Order Again from ${title} ${router.query.id}`

    case 'list':
      return title

    default:
      return ''
  }
}
