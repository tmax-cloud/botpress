import { Menu, MenuItem } from '@blueprintjs/core'
import classNames from 'classnames'
import _ from 'lodash'
import React, { FC } from 'react'

const SuggestionText: FC<SuggestionTextProps> = props => {
  const { suggestion, token } = props
  const tokens = suggestion.match(new RegExp(token, 'gi'))
  let html = suggestion
  tokens?.forEach(token => {
    html = html.replace(new RegExp(token, 'g'), `<span class='bpw-suggestion-item-text-highlighted'>${token}</span>`)
  })
  return <div className={'bpw-suggestion-item-text'} dangerouslySetInnerHTML={{ __html: html }}></div>
}

const SuggestionList: FC<SuggestionListProps> = props => {
  const { isLoading, inputMessage, suggestions, onItemClick } = props
  return (
    <>
      {isLoading ? (
        <div className={'bpw-typing-group bpw-suggestion-typing-group'}>
          <div className={'bpw-typing-bubble'} />
          <div className={'bpw-typing-bubble'} />
          <div className={'bpw-typing-bubble'} />
        </div>
      ) : (
        !_.isEmpty(suggestions) && (
          <Menu className={classNames('bpw-suggestion-list', { 'bpw-suggestion-list-scroll': suggestions.length > 4 })}>
            {suggestions.map(suggestion => {
              return (
                <MenuItem
                  className={'bpw-suggestion-item'}
                  key={suggestion}
                  text={<SuggestionText suggestion={suggestion} token={inputMessage} />}
                  onClick={(event: React.MouseEvent<HTMLElement>) => onItemClick(event, suggestion)}
                />
              )
            })}
          </Menu>
        )
      )}
    </>
  )
}

export default SuggestionList

interface SuggestionTextProps {
  suggestion: string
  token: string
}

interface SuggestionListProps {
  isLoading: boolean
  inputMessage: string
  suggestions: string[]
  onItemClick: (event: React.MouseEvent<HTMLElement>, value: string) => void
}
