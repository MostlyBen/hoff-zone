import { useTheme } from '../../utils/themeProvider';
import { h1 as H1, h2 as H2, h3 as H3 } from '../../mdx'
// import Image from 'next/image'

const Banner = ({ src, position }) => {
  const { theme } = useTheme();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <div
      style={{
        background: `url(${src})`,
        height: "240px",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: position,
        border: `2px solid ${theme.yellow}`,
        borderRadius: '4px'
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

  return (
    <div className="module-frontmatter">
      {pageData.banner && <Banner src={pageData.banner} position={pageData['banner-position']} />}

      <H1>{pageData.title}</H1>

      {Array.isArray(pageData.tags) &&
       pageData.tags.map((t, i) => <span className="tag" key={`tag-${i}`}>#{t}</span>)
      }

      {pageData['driving-question'] &&
      <H2>{pageData['driving-question']}</H2>
      }

      {pageData.know && <GeneralReadout title="Know" content={pageData.know} />}
      {pageData.understand && <GeneralReadout title="Understand" content={pageData.understand} />}
      {pageData.do && <GeneralReadout title="Do" content={pageData.do} />}

      <hr className='divider' />
    </div>
  )
}

export default Frontmatter