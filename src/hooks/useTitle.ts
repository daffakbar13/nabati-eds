import { useRouter } from 'next/router'

const GetPath = (path: string) =>
  path
    .split('/')
    .filter((e) => e !== '')[1]
    ?.split('-')
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
    .join(' ')
    .split('?')[0]

export const useTitle = (): string => {
  const router = useRouter()
  const path = GetPath(router.asPath)
  const title = path || 'Home'

  return title
}
