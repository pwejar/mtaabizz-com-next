import React from 'react'
type Params = Promise<{ storeID: string }>
export default async function page(props: {
  params: Params
}) {
  const {storeID} = await props.params
  return (
    <div>page {storeID}</div>
  )
}
