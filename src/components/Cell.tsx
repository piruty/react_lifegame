import React from 'react'

type CellProps = {
  active?: boolean;
  index: number;
}

const Component: React.FC<CellProps> = ({ active = false, index }) => {
  const style = active ? { background: 'black' } : {}
  return (
    <td style={style} key={index} width={20} height={20}></td>
  )
}

export default Component
