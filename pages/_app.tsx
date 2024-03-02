import { Global, css } from '@emotion/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import '../public/fonts/index.css';

// eslint-disable-next-line react/prop-types,@typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }): React.ReactElement => (
    <>
        <Head>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="manifest.json" />

            <meta
                name="description"
                content="A minimalistic narrative-first game with simple mechanics."
            />
            <meta name="keywords" content="game,text,narrative,choices" />

            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="dirty trail" />
            <meta name="apple-mobile-web-app-title" content="dirty trail" />
            <meta name="theme-color" content="#212529" />
            <meta name="msapplication-navbutton-color" content="#212529" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <meta
                name="msapplication-starturl"
                content="https://adirtytrail.netlify.app"
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />

            <link
                rel="icon"
                type="image/png"
                sizes="512x512"
                href="icons/icon-512-512.png"
            />
            <link
                rel="apple-touch-icon"
                type="image/png"
                sizes="512x512"
                href="icons/icon-512-512.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="icons/icon-192-192.png"
            />
            <link
                rel="apple-touch-icon"
                type="image/png"
                sizes="192x192"
                href="icons/icon-192-192.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="144x144"
                href="icons/icon-144-144.png"
            />
            <link
                rel="apple-touch-icon"
                type="image/png"
                sizes="144x144"
                href="icons/icon-144-144.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href="icons/icon-96-96.png"
            />
            <link
                rel="apple-touch-icon"
                type="image/png"
                sizes="96x96"
                href="icons/icon-96-96.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="72x72"
                href="icons/icon-72-72.png"
            />
            <link
                rel="apple-touch-icon"
                type="image/png"
                sizes="72x72"
                href="icons/icon-72-72.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="48x48"
                href="icons/icon-48-48.png"
            />
            <link
                rel="apple-touch-icon"
                type="image/png"
                sizes="48x48"
                href="icons/icon-48-48.png"
            ></link>
        </Head>
        <Global
            styles={css`
                html,
                body {
                    font-family: RobotoSlab, serif;
                    font-weight: 400;
                    line-spacing: 0.2px;
                    font-size: 18px;
                    scrollbar-width: 5px;
                    scollbar-color: var(--dark);
                    overflow-y: overlay;
                    overflow-x: hidden;
                    min-height: 100vh;
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-family: NotoSansJP;
                }

                a {
                    color: inherit;
                    text-decoration: underline;
                }

                #__next {
                    position: relative;
                    min-height: 100vh;
                }

                h2 {
                    text-transform: capitalize;
                }

                h3 {
                    font-size: 1.2rem;
                    font-weight: bold;
                    text-transform: capitalize;
                }

                h4 {
                    text-transform: capitalize;
                    font-weight: bold;
                    font-size: 1rem;
                }

                .text-small {
                    font-size: 0.8rem;
                }

                ::-webkit-scrollbar {
                    width: 5px;
                    height: 8px;
                    background-color: var(--secondary);
                }

                ::-webkit-scrollbar-thumb {
                    background: var(--dark);
                }

                .absolute-top-left {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                }

                .absolute-bottom-left {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }
            `}
        />
        <Component {...pageProps} />
    </>
);

export default App;
