import React from 'react'

export default async function page({params,}:{ params: {storeID: string}}) {
  const StoreUsername: string = await params.storeID
  return (
    <div>page {StoreUsername}</div>
  )
}
