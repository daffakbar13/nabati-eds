import { useRouter } from 'next/router'
import React from 'react'
import { TabDocumentFlow } from 'src/components'

export default function DocumentFlow() {
  const router = useRouter()

  return <TabDocumentFlow document_id={router.query.id as string} />
}
