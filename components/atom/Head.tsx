import Head from 'next/head'

export interface Meta {
  title: string
  date: string[] // new Date().toGMTString
  tag: string[]
  url: string
  category: string
  description: string
  image: string // url
}

export const HeadTag: React.FC<Meta> = (props: Meta) => {
  return <Head>
    <title>{props.title}</title>
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={__dirname} />
    <meta property="og:image" content={props.image} />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.description} />
    <meta name="twitter:image" content={props.image} />
  </Head>
}