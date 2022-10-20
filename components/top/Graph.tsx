import * as awsui from '@cloudscape-design/design-tokens'
import styled from 'styled-components'

const StyledGraphSvg = styled.svg`
  fill: ${awsui.colorTextAccent};
  width: 100%;
  height: auto;
`

export function Graph() {
  return (
    <StyledGraphSvg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
    >
      <g>
        <g>
          <rect
            x="3"
            y="42.5"
            width="10"
            height="14"
            data-original="#7ED09E"
            className="active-path"
            data-old_color="#D79771"
          ></rect>
          <rect
            x="18"
            y="33.5"
            width="10"
            height="23"
            data-original="#71C285"
          ></rect>
          <rect
            x="33"
            y="25.5"
            width="10"
            height="31"
            data-original="#4FBA6F"
            className=""
            data-old_color="#F2A983"
          ></rect>
          <rect
            x="48"
            y="17.5"
            width="10"
            height="39"
            data-original="#24AE5F"
            className=""
          ></rect>
          <path
            d="M59,57.5H1c-0.552,0-1-0.447-1-1s0.448-1,1-1h58c0.552,0,1,0.447,1,1S59.552,57.5,59,57.5z"
            data-original="#556080"
            className=""
          ></path>
          <path
            d="M8.03,27.83c-0.346,0-0.682-0.179-0.867-0.5c-0.276-0.479-0.112-1.09,0.366-1.366L46.5,3.464   c0.478-0.277,1.089-0.112,1.366,0.366c0.276,0.479,0.112,1.09-0.366,1.366l-38.971,22.5C8.372,27.787,8.199,27.83,8.03,27.83z"
            data-original="#BDC3C7"
            className=""
          ></path>
          <path
            d="M47.001,5.33c-0.032,0-0.064-0.002-0.098-0.005l-8.562-0.83c-0.549-0.053-0.952-0.542-0.898-1.092   c0.053-0.549,0.537-0.954,1.092-0.898l8.562,0.83c0.549,0.053,0.952,0.542,0.898,1.092C47.945,4.943,47.51,5.33,47.001,5.33z"
            data-original="#BDC3C7"
            className=""
          ></path>
          <path
            d="M43.437,13.16c-0.139,0-0.279-0.028-0.414-0.09c-0.503-0.229-0.725-0.821-0.496-1.324l3.562-7.83   c0.229-0.503,0.822-0.727,1.324-0.496c0.503,0.229,0.725,0.821,0.496,1.324l-3.562,7.83C44.181,12.942,43.817,13.16,43.437,13.16z"
            data-original="#BDC3C7"
            className=""
          ></path>
        </g>
      </g>
    </StyledGraphSvg>
  )
}
