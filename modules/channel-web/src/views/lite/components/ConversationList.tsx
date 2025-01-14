import classnames from 'classnames'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import { RootStore, StoreDef } from '../store'
import { RecentConversation } from '../typings'

const ConversationListItem = injectIntl(({ conversation, onClick, hasFocus, intl }: ConversationListItemProps) => {
  const title = intl.formatMessage({ id: 'conversationList.title' }, { id: conversation.id })
  const date = intl.formatRelative(conversation.lastMessage?.sentOn || conversation.createdOn)
  const message = conversation.lastMessage?.payload?.text || '...'

  return (
    <div className={'bpw-convo-item'} onClick={onClick}>
      <div className={'bpw-align-right'}>
        <div className={'bpw-title'}>
          <div className={'bpw-title-text'}>{title}</div>
          <div className={'bpw-date'}>
            <span>{date}</span>
          </div>
        </div>
        <div className={'bpw-convo-preview'}>{message}</div>
      </div>
    </div>
  )
})

type ConversationListItemProps = {
  conversation: RecentConversation
  hasFocus: boolean
  onClick: (event: React.MouseEvent) => void
} & InjectedIntlProps &
  Pick<StoreDef, 'conversations' | 'fetchConversation' | 'createConversation'>

class ConversationList extends React.Component<ConversationListProps> {
  private main: HTMLElement
  private btn: HTMLElement

  state = {
    focusIdx: undefined
  }

  componentDidMount() {
    this.main.focus()
  }

  componentDidUpdate(_, prevState) {
    if (this.state.focusIdx === this.props.conversations.length) {
      this.btn.focus()
    } else if (prevState.focusIdx === this.props.conversations.length) {
      this.main.focus()
    }
  }

  changeFocus = step => {
    let focusIdx = this.state.focusIdx || 0
    focusIdx += step

    if (focusIdx > this.props.conversations.length) {
      focusIdx = 0
    } else if (focusIdx < 0) {
      focusIdx = this.props.conversations.length
    }

    this.setState({ focusIdx })
  }

  handleKeyDown = e => {
    if (!this.props.enableArrowNavigation) {
      return
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      this.changeFocus(1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      this.changeFocus(-1)
    } else if (e.key === 'Enter' && this.state.focusIdx && this.state.focusIdx < this.props.conversations.length) {
      const convoId = this.props.conversations[this.state.focusIdx].id
      this.props.fetchConversation.bind(this, convoId)
    }
  }

  renderListItem(orderBy, conversations, fetchConversation) {
    const newConvos = _.sortBy(conversations, convo => convo.lastMessage?.sentOn || convo.createdOn)
    const conversationList = orderBy === 'desc' ? newConvos.reverse() : newConvos
    return conversationList.map((convo, idx) => (
      <ConversationListItem
        key={convo.id}
        hasFocus={this.state.focusIdx === idx}
        conversation={convo}
        onClick={fetchConversation.bind(this, convo.id)}
      />
    ))
  }

  render() {
    const {
      conversations,
      createConversation,
      fetchConversation,
      sortConversations,
      intl,
      conversationsOrderBy
    } = this.props
    return (
      <div className={'bpw-convo-container'}>
        <div className={'bpw-convo-header-container'}>
          <button
            ref={el => (this.btn = el)}
            id="btn-convo-add"
            className={'bpw-convo-add-btn'}
            onClick={createConversation.bind(this, undefined)}
          >
            {intl.formatMessage({ id: 'conversationList.addConversation' })}
          </button>
          <div className={'bpw-convo-header-title-conainer'}>
            <div className={'bpw-convo-header-title'}>
              {intl.formatMessage({ id: 'conversationList.headerTitle' }, { size: conversations.length })}
            </div>
            <button id="btn-convo-sort-list" className={'bpw-convo-header-sort-btn'} onClick={sortConversations}>
              <span
                className={classnames('bpw-convo-header-sort-arrow', {
                  'bpw-convo-header-sort-arrow-down': conversationsOrderBy === 'asc'
                })}
              />
              {intl.formatMessage({ id: 'conversationList.headerSort' })}
            </button>
          </div>
        </div>
        <div tabIndex={0} ref={el => (this.main = el)} className={'bpw-convo-list'} onKeyDown={this.handleKeyDown}>
          {this.renderListItem(conversationsOrderBy, conversations, fetchConversation)}
        </div>
      </div>
    )
  }
}

export default inject(({ store }: { store: RootStore }) => ({
  conversations: store.conversations,
  createConversation: store.createConversation,
  fetchConversation: store.fetchConversation,
  enableArrowNavigation: store.config.enableArrowNavigation,
  conversationsOrderBy: store.view.conversationsOrderBy,
  sortConversations: store.view.sortConversations
}))(injectIntl(observer(ConversationList)))

type ConversationListProps = InjectedIntlProps &
  Pick<
    StoreDef,
    | 'conversations'
    | 'fetchConversation'
    | 'createConversation'
    | 'enableArrowNavigation'
    | 'conversationsOrderBy'
    | 'sortConversations'
  >
