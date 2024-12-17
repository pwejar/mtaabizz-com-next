import React from 'react'

export default function page(props: { params: {storeID: string}}) {
  const {storeID} = props.params
  return (
    <div>page {storeID}</div>
  )
}
