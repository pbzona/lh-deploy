import Image from "next/image"
import style from './css/LDLogo.module.css'

export default function LDLogo({ height, width }) {
  return (
    <div className={style.wrapper}>
      <Image src='/svg/LaunchDarkly.svg' height={height} width={width} />
      <span className={style.subText}>North Star</span>
    </div>
  )
}
