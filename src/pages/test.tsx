import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { useEffect, useState } from "react";

const Test = () => {
  const [storedMd, setStoredMd] = useState<MDXRemoteSerializeResult | null>( null)
  const [response, setResponse] = useState('')

  const updateMd = async () => {
    const content = localStorage.getItem('mdContent')
    const mdxSource = await serialize(content)
    setStoredMd(mdxSource)
  }

  useEffect(() => {
    updateMd()
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const generateProject = async () => {
      const pageReq = await fetch(`/api/frontmatter?path=${'/sci/11'/* asPath */}`);
      const pageData = await pageReq.json();

      const res = await fetch(`/api/ai/generate-project`, {
        method: "POST",
        body: JSON.stringify({
          project_data: pageData.data,
          user_request: "The project should be more fun"
        })
      });
      const responseMessage = await res.json()

      setResponse(responseMessage.output)
    }

    // generateProject()
  }, [])

  useEffect(() => {
    if (response) {
      localStorage.setItem('mdContent', response)
      updateMd();
    }
  }, [response])

  return (
    <div>
      Test api call
      <br />
      Response:
      <div style={{whiteSpace: "pre-wrap"}}>{response}</div>

      {storedMd && <MDXRemote {...storedMd} />}

    </div>
  )
}

export default (props) => {
  return <Test {...props} />;
};