import { useSpring } from 'react-spring';

const useFadeIn = () => {
    const props = useSpring({
        to: async (next) => {
            await next({ opacity: 1 });
        },
        from: { opacity: 0 },
        delay: 300,
    });

    return props;
};

export default useFadeIn;
