import * as React from "react"

function Mouth(props) {
  return (
    <svg viewBox="0 0 55 55" {...props}>
      <defs>
        <style>
          {
            `.prefix__cls-1{fill:none;stroke:${props.color};stroke-linecap:round;stroke-miterlimit:10}`
          }
        </style>
      </defs>
      <title>{"Asset 1"}</title>
      <g id="prefix__Layer_2" data-name="Layer 2">
        <g id="prefix__Layer_3" data-name="Layer 3">
          <g id="prefix__Mouth_Outline" data-name="Mouth Outline">
            <circle strokeWidth={props.width} className="prefix__cls-1" cx={27.5} cy={27.5} r={25} />
            <circle strokeWidth={props.width} fill={props.color} cx={21.6} cy={22.03} r={1.8} />
            <circle strokeWidth={props.width} fill={props.color} cx={34.06} cy={22.03} r={1.8} />
            <path
            strokeWidth={props.width}
              className="prefix__cls-1"
              d="M37.14 33.29c-3.08 4.62-6.55 5.4-9.25 5.4s-6.95-.78-9.26-5"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Mouth
