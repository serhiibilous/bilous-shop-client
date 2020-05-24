import styled from 'styled-components'
import React from 'react'

export const Content = styled.div`
  margin: 30px 0;
`

export const ButtonContainer = styled.div`
  margin: 30px auto;
  max-width: 300px;
  text-align: center;
`

export const ImageContainer = styled.div`
  width: 400px;
  height: 400px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  height: 100%;
  width: auto;
`

export const CarouselTitle = styled.h2`
  text-align: center;
  margin: 30px 0 30px;
`

export function CarouselControlNext() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 32 32"
      height="60px"
      id="CarouselControlNext"
      version="1.1"
      viewBox="0 0 32 32"
      width="60px">
      <path
        d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z"
        fill="#ccc"
      />
    </svg>
  )
}

export function CarouselControlPrev() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 32 32"
      height="60px"
      id="CarouselControlPrev"
      version="1.1"
      viewBox="0 0 32 32"
      width="60px">
      <path
        d="M7.701,14.276l9.586-9.585c0.879-0.878,2.317-0.878,3.195,0l0.801,0.8c0.878,0.877,0.878,2.316,0,3.194  L13.968,16l7.315,7.315c0.878,0.878,0.878,2.317,0,3.194l-0.801,0.8c-0.878,0.879-2.316,0.879-3.195,0l-9.586-9.587  C7.229,17.252,7.02,16.62,7.054,16C7.02,15.38,7.229,14.748,7.701,14.276z"
        fill="#ccc"
      />
    </svg>
  )
}
