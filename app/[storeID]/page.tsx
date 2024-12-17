import React from 'react'

export default function page({params,}:{ params: {storeID: string}}) {
  const {storeID} = params
  return (
    <div>page {storeID}</div>
  )
}
