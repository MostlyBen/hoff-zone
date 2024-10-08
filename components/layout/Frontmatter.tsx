import { h1 as H1, h2 as H2, h3 as H3 } from '../../mdx'
import Link from 'next/link';
import { formatAsId } from "../../utils";

const Banner = ({ src, position }) => {

  return (
    <div
      className="module-banner"
      aria-label="module banner"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
        border: `2px solid var(--primary)`,
        marginBottom: '1.5em',
      }}
    />
  )
}

const GeneralReadout = ({ title, content }) => {
  return (
    <div>
      <H3>{title}</H3>
      <section id={'h3-' + formatAsId(title) + '-content'}>
        {Array.isArray(content)
          ? content.map((c, i) => <div key={`${title}-content-${i}`}>{c}</div>)
          : <div>{content}</div>
        }
      </section>
    </div>
  )
}

const Frontmatter = ({ pageData }) => {

  return (
    <div className="module-frontmatter" style={!pageData.banner ? { paddingTop: '2em' } : {}}>
      {pageData.banner && <Banner src={pageData.banner} position={pageData['banner-position']} />}

      <Link href="/" replace>{'<- Go Home'}</Link>

      {pageData.title && <H1 style={{ margin: '0.25em 0' }}>{pageData.title}</H1>}
      <section
        id={pageData.title ? `h1-${formatAsId(pageData.title)}-content` : 'h1-page-title'}>

        {Array.isArray(pageData.tags) &&
          pageData.tags.map((t: string, i: number) => <span className="tag" key={`tag-${i}`}>#{t}</span>)
        }

        {pageData['driving-question'] &&
          <H2 style={{ marginTop: '0.75em' }}>{pageData['driving-question']}</H2>
        }

        <section id={pageData['driving-question'] ? `h2-${formatAsId(pageData['driving-question'])}-content` : 'h2-project-info'}>
          {pageData.know && <GeneralReadout title="Know" content={pageData.know} />}
          {pageData.understand && <GeneralReadout title="Understand" content={pageData.understand} />}
          {pageData.do && <GeneralReadout title="Do" content={pageData.do} />}
        </section>

      </section>
      <hr className='divider' style={{ border: `1px solid var(--primary)` }} />
    </div>
  )
}

export default Frontmatter
