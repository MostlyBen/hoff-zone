import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../utils/themeProvider';
import { Console } from '../console';
import { ThemeSwitcher } from '../input';
import { default as Lofi } from './Lofi';
import { Frontmatter } from '../layout';
import formatAsId from '../../utils/formatAsId';
import removeRegenerateText from '../../utils/removeRegenerateText';
interface Props {
  // Literally so annoyed that I can't figure out what the heck these children are
  // The whole mess at the start of this file is a result of that
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  frontmatter?: object;
}

const checkIfHr = (element) => {
  return (
    typeof element.type === 'function' &&
    element?.type?.toString().includes("hr")
  )
}

const removeFrontmatter = (children:React.ReactNode[]) => {
  if (!Array.isArray(children)) { return children }
  if (!checkIfHr(children[0])) { return children }

  let frontmatterEnd:number = 0
  for (let i:number = 0; i < children.length; i++) {
    if (i > 0 && checkIfHr(children[i])) {
      frontmatterEnd = i + 1;
      break;
    }
  }

  return children.slice(frontmatterEnd)
}

const sectionHeaderContent = (children, level:number) => {
  const _children = [...children];
  const toReturn = [];
  let thisSectionElements = [];
  let currentSection:string|null = null;

  for (const child of _children) {
    let headerLevel = 0;
    if (typeof child.type == 'function' && child.type.toString().includes(`H1.tsx`)) { headerLevel = 1 }
    if (typeof child.type == 'function' && child.type.toString().includes(`H2.tsx`)) { headerLevel = 2 }
    if (typeof child.type == 'function' && child.type.toString().includes(`H3.tsx`)) { headerLevel = 3 }
    if (typeof child.type == 'function' && child.type.toString().includes(`HR.tsx`)) { headerLevel = -1 }

    // Other Elements
    if (headerLevel > level || headerLevel === 0) {
      if (currentSection) {
        thisSectionElements.push(child);
      } else {
        toReturn.push(child);
      }
      continue;
    }

    if (headerLevel <= level) {
      if (thisSectionElements.length) {
        console.log("adding section:", currentSection)
        toReturn.push(
          <section
            id={formatAsId(`h${level}-${currentSection}-content`)}
            key={`${currentSection}-content`}
          >
            {thisSectionElements}
          </section>
        )
      }

      toReturn.push(child);
      thisSectionElements = [];
    }

    currentSection = headerLevel === level
      ? Array.isArray(child.props.children)
        ? removeRegenerateText(child.props.children[0])
        : typeof child.props.children === 'string' ? removeRegenerateText(child.props.children) : `h${level}`
      : null;
  }

  if (thisSectionElements.length) {
    toReturn.push(
      <section
        id={formatAsId(`h${level}-${currentSection}-content`)}
        key={`${currentSection}-content`}
      >
        {thisSectionElements}
      </section>
    )
  }

  return toReturn
}

const Layout: React.FC<Props> = ({ children, frontmatter }) => {
  // Why do I have to do children.type()? Idk. Idek what children.type is
  const _children = children.type().props.children
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [lofiOpen, setLofiOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const [processedChildren, setProcessedChildren] = useState(children);

  useEffect(() => {
    document.addEventListener('onLofiOpen', () => setLofiOpen(true));
    return () => document.removeEventListener('onLofiOpen', () => setLofiOpen(false));
  }, []);

  useEffect(() => {
    let newChildren = removeFrontmatter(_children);
    newChildren = sectionHeaderContent([...newChildren], 3);
    newChildren = sectionHeaderContent([...newChildren], 2);
    newChildren = sectionHeaderContent([...newChildren], 1);
    setProcessedChildren(newChildren)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [consoleOpen]);

  return (
    <div
      className={`min-w-max text-xs md:min-w-full md:text-base flex flex-row flex-col-sm bg-cover`}
      style={{
        color: theme.foreground,
        background: theme.background,
      }}
    >
      <div
        className={`p-2 console-container h-100p relative${consoleOpen ? '' : ' minimized'}`}
        style={{
        }}
      >
        <Console inputRef={inputRef} />
        {consoleOpen
        ? <button
            className="absolute btn hide block-md"
            onClick={() => setConsoleOpen(false)}
            style={{bottom: '16px', right: '16px', borderColor: theme.cursorColor}}
          >/\</button>
        :<button
        className="absolute btn hide block-md"
        onClick={() => setConsoleOpen(true)}
        style={{bottom: '16px', right: '16px', borderColor: theme.cursorColor}}
      >\/</button>
        }
      </div>

      <main
        className="main-container flex-grow relative"
      >
        {frontmatter
        ? Object.keys(frontmatter).length
          ? <Frontmatter pageData={frontmatter} />
          : <></>
        : <></>}

        {processedChildren}
        
      </main>
      {lofiOpen && <Lofi onClose={() => setLofiOpen(false)} />}
      <ThemeSwitcher />
    </div>
  );
};

export default Layout;
