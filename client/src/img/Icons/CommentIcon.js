import * as React from "react"

function CommentIcon(props) {
  return (
    <svg viewBox="0 0 60 49.62" {...props}>
      <defs>
        <style>
          {
            `.prefix__cls-2{fill:none;stroke:${props.color};stroke-width:3px;stroke-linecap:round;stroke-linejoin:round}`
          }
        </style>
      </defs>
      <g id="prefix__Layer_2" data-name="Layer 2">
        <g id="prefix__Layer_4" data-name="Layer 4">
          <path
            d="M15.5 47.5l6-6h28.16c4.88 0 8.84-3 8.84-7.84v-23a9.2 9.2 0 00-9.19-9.16H10.69a9.2 9.2 0 00-9.19 9.19V32.6a8.84 8.84 0 004.16 7.5L10 42z"
            strokeMiterlimit={10}
            fill="none"
            stroke={props.color}
            strokeWidth={3}
          />
          <path className="prefix__cls-2" d="M19 18h23M19 25h23" />
        </g>
      </g>
    </svg>
  )
}

export default CommentIcon
