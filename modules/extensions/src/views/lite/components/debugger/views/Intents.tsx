import { H5, Pre } from '@blueprintjs/core'
import React from 'react'

import style from '../style.scss'
import { formatConfidence } from '../utils'

export const Intents = props => {
  const { intent, intents, includedContexts } = props.nlu
  if (!intent || !intents) {
    return null
  }

  return (
    <div className={style.block}>
      <H5>Intent</H5>
      <small>Contexts: {(includedContexts || []).join(', ')}</small>
      <Pre>
        {formatConfidence(intent.confidence)}% - {intent.name}
      </Pre>
    </div>
  )
}