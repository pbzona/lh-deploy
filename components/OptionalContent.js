import React from 'react'
import useCollapse from 'react-collapsed'
import styles from './css/OptionalContent.module.css'

export default function OptionalContent({children}) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div className={styles.optionalContent}>
      <button {...getToggleProps()}>
        {isExpanded ? 'X' : 'Expand'}
      </button>
      <section {...getCollapseProps()}>{children}</section>
    </div>
  )
}