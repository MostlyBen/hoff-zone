import { useTheme } from '../../utils/themeProvider';
import { h1 as H1, h2 as H2, h3 as H3 } from '../../mdx'

const Banner = ({ src, position }) => {
  const { theme } = useTheme();

  return (
    <div
      className="module-banner"
      aria-label="module banner"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
        border: `2px solid ${theme.yellow}`,
      }}
    />
  )
}

const GeneralReadout = ({ title, content }) => {
  return (
    <div>
      <H3>{title}</H3>
      {Array.isArray(content)
       ? content.map((c, i) => <div key={`${title}-content-${i}`}>{c}</div>)
       : <div>{content}</div>
       }
    </div>
  )
}

const Frontmatter = ({ pageData }) => {
  const { theme } = useTheme();

  return (
    <div className="module-frontmatter">
      {pageData.banner && <Banner src={pageData.banner} position={pageData['banner-position']} />}

      <H1 style={{margin: '0.5em 0'}}>{pageData.title}</H1>

      {Array.isArray(pageData.tags) &&
       pageData.tags.map((t: string, i: number) => <span className="tag" key={`tag-${i}`}>#{t}</span>)
      }

      {pageData['driving-question'] &&
      <H2>{pageData['driving-question']}</H2>
      }

      {pageData.know && <GeneralReadout title="Know" content={pageData.know} />}
      {pageData.understand && <GeneralReadout title="Understand" content={pageData.understand} />}
      {pageData.do && <GeneralReadout title="Do" content={pageData.do} />}

      <hr className='divider' style={{border: `1px solid ${theme.yellow}`}} />
    </div>
  )
}

export default Frontmatter