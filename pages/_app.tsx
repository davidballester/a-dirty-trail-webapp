import { Global, css } from '@emotion/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';

// eslint-disable-next-line react/prop-types,@typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }): React.ReactElement => (
    <>
        <Head>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Global
            styles={css`
                html,
                body {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                    scrollbar-width: 5px;
                    scollbar-color: var(--dark);
                    overflow-y: overlay;
                    overflow-x: hidden;
                    min-height: 100vh;
                }

                a {
                    color: inherit;
                    text-decoration: none;
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
