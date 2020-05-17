import React from 'react'
import { Container } from './loader-components'

export default function Loader() {
  return (
    <Container>
      <svg
        width="150"
        height="150"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#343a40"
        aria-label="audio-loading">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(193.735 18 18)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </Container>
  )
}
