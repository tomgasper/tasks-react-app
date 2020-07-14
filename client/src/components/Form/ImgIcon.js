import * as React from "react"

function ImgIcon(props) {
  return (
    <svg viewBox="0 0 85 46" {...props} transform='scale(1)'>
      <defs>
        <clipPath id="prefix__a" transform="translate(8)">
          <rect x={1.5} y={1.5} width={61} height={43} rx={11.5} fill="none" />
        </clipPath>
      </defs>
      <title>{"Asset 1"}</title>
      <g data-name="Layer 2">
        <rect
          x={9.5}
          y={1.5}
          width={61}
          height={43}
          rx={11.5}
          stroke="#000"
          strokeMiterlimit={10}
          strokeWidth={3}
          fill="none"
        />
        <circle cx={26} cy={14} r={4.5} />
        <g clipPath="url(#prefix__a)">
          <path d="M26 27l9 10 19-21 16 15 15 15H0l26-19z" />
        </g>
      </g>
    </svg>
  )
}

export default ImgIcon
