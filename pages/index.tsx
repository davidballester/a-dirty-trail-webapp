import { css } from 'emotion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainTitle from '../components/MainTitle';
import { GameProvider } from '../contexts/gameContext';
import Narration from '../components/Narration';
import PlayerActions from '../components/PlayerActions';
import Player from '../components/Player';
import Scene from '../components/Scene';
import Head from 'next/head';
import About from '../components/About';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <header
            className={css`
                position: sticky;
            `}
        >
            <MainTitle />
        </header>
        <main>
            <GameProvider>
                <Container>
                    <Row>
                        <Col md={3}>
                            <Player />
                        </Col>
                        <Col md={6}>
                            <Narration />
                            <PlayerActions />
                        </Col>
                        <Col md={3}>
                            <Scene />
                        </Col>
                    </Row>
                </Container>
            </GameProvider>
        </main>
        <footer>
            <About />
        </footer>
    </>
);

export default Home;
