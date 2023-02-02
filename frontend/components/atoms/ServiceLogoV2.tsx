import { IconProp } from '../../interfaces/IconProp'

const ServiceLogoV2 = ({width, height, fill}: IconProp) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.09 735.94">
      <defs>
        <style dangerouslySetInnerHTML={{__html: "\n      .cls-1 {\n        mix-blend-mode: multiply;\n      }\n\n      .cls-2 {\n        fill: none;\n        stroke: #5a9eb5;\n        stroke-miterlimit: 10;\n        stroke-width: 135px;\n      }\n\n      .cls-3 {\n        isolation: isolate;\n      }\n    " }} />
      </defs>
      <g className="cls-3">
        <g id="_レイヤー_1" data-name="レイヤー 1">
          <g className="cls-1">
            <path className="cls-2" d="m67.5,209.37c0-78.36,63.52-141.87,141.87-141.87s141.87,63.5,141.87,141.87-63.5,141.85-141.87,141.85-141.87-63.5-141.87-141.85Z" />
            <circle className="cls-2" cx="209.37" cy="526.58" r="141.87" transform="translate(-311.03 302.28) rotate(-45)" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ServiceLogoV2
