import React from 'react'

const Link = (props) => {
  return (
    <div className={'bpw-link'}>
      <a
        href={props.btn.url}
        key={`1-${props.btn.title}`}
        target={/^javascript:/.test(props.btn.url) ? '_self' : '_blank'}
        className={'bpw-link-action'}
      >
        {props.btn.title || props.btn}
        {/^javascript:/.test(props.btn.url) ? null : <i className={'bpw-card-external-icon'} />}
      </a>
    </div>
  )
}

export default Link
