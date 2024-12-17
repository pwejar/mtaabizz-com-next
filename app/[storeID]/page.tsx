import React from 'react'

export default function page({params,}:{ params: {storeID: string}}) {
  const StoreUsername: string = params.storeID
  return (
    <div>page {StoreUsername}</div>
  )
}
