import { css } from 'emotion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GameProvider } from '../contexts/gameContext';
import Narration from '../components/Narration';
import PlayerActions from '../components/PlayerActions';
import Player from '../components/Player';
import Scene from '../components/Scene';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = (): React.ReactElement => (
    <>
        <Head>
            <title>A dirty trail</title>
        </Head>
        <Header />
        <main
            className={css`
                padding-bottom: 7.5rem;
            `}
        >
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
        <Footer />
    </>
);

export default Home;
