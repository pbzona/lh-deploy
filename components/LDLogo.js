import Image from "next/image"

export default function LDLogo({ height, width }) {
  return (
    <Image src='/svg/LaunchDarkly.svg' height={height} width={width} />
  )
}
