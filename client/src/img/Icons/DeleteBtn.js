import * as React from "react"

function DeleteBtn(props) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle fill="#E04B4B" cx={10} cy={10} r={10} />
        <text
          fontFamily="GujaratiSangamMN-Bold, Gujarati Sangam MN"
          fontSize={12}
          fontWeight="bold"
          letterSpacing={1.766}
          fill="#FFF"
        >
          <tspan x={6} y={15}>
            {"X"}
          </tspan>
        </text>
      </g>
    </svg>
  )
}

export default DeleteBtn
