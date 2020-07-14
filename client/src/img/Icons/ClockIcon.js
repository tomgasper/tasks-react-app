import * as React from "react"

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 56 56" {...props}>
      <g fill="none" stroke={props.color} strokeWidth={3} data-name="Layer 2">
        <circle cx={28} cy={28} r={26.5} strokeMiterlimit={10} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M41.25 37.25l-13.5-7.49.03-14.01"
        />
      </g>
    </svg>
  )
}

export default ClockIcon
