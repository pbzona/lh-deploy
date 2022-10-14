import LDLogo from "./components/LDLogo";

export default {
  github: 'https://github.com/shuding/nextra',
  docsRepositoryBase: 'https://github.com/shuding/nextra/blob/master',
  titleSuffix: ' - LaunchDarkly',
  darkMode: false,
  logo: (
    <LDLogo height={160} width={560} />
  ),
  head: (
    <link
      rel="icon"
      type="favicon"
      href="/favicon.ico"
    />
  ),
  search: false,
  prevLinks: true,
  nextLinks: true,
  footer: false,
  defaultMenuCollapsed: false,
}
