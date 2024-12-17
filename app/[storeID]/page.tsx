import React from 'react'

export default async function page({params,}:{ params: {storeID: string}}) {
  const {storeID} = await params
  return (
    <div>page {storeID}</div>
  )
}
