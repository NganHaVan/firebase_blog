import React, { ReactNode, CSSProperties } from 'react'
import "./ShadowCard.css";

type ShadowCardProps = {
  children: ReactNode;
  style?: CSSProperties
}

export default function ShadowCard(props: ShadowCardProps) {
  return (
    <div className="Card" {...props}>
      {props.children}
    </div>
  )
}
