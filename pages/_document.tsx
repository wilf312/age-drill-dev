import Document, {DocumentContext,Html, Head, Main, NextScript, DocumentInitialProps} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class _document extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => {
        return originalRenderPage({
          enhanceApp: (App) => props => {
            return sheet.collectStyles(<App {...props} />)
          }
        })
      }
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@wilf_genya" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <link href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap" rel="stylesheet" media="print" 
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onLoad="this.media='all'"
          />
        </body>
      </Html>
    )
  }
}
