import Image from "next/image"
import style from './css/LDLogo.module.css'

export default function LDLogo({ height, width }) {
  return (
    <div className={style.wrapper}>
      <Image src='/images/LD_NorthStar_Logo.png' height={height} width={width} layout='intrinsic'/>
    </div>
  )
}
