import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES_LINE_X = 552;
const VALUES_FRAME_WIDTH = 1905;
const VALUES_ITEM_HEIGHT = 1024;

const VALUE_ITEMS = [
    {
        image: 'images/value_item1.jpg',
        alt: 'Nature Refined',
        title: 'Nature Refined',
        subtitle: '자연과 과학이 빚어낸 정교한 균형',
        body: 'Experience the perfect blend of botanical purity and scientific precision, meticulously formulated for your skin, hair, and body care needs.',
    },
    {
        image: 'images/value_item2.jpg',
        alt: 'Essential Aesthetics',
        title: 'Essential Aesthetics',
        subtitle: '본질만을 지향하는 절제의 미학',
        body: 'A refined pursuit of purity that strips away the unnecessary, revealing the profound elegance of a skin care essence through mindful simplicity.',
    },
    {
        image: 'images/value_item3.jpg',
        alt: 'Inspiring Rituals',
        title: 'Inspiring Rituals',
        subtitle: '영감을 채우는 지적이고 감각적인 여정',
        body: 'A sophisticated journey of intellect and sense, curated to awaken your inspirations in the beauty of every moment.',
    },
    {
        image: 'images/value_item4.jpg',
        alt: 'Ethical Commitments',
        title: 'Ethical Commitments',
        subtitle: '지구와 생명을 존중하는 확고한 원칙',
        body: 'A steadfast journey dedicated to honoring our planet and all living beings through conscious choices and unwavering integrity.',
    },
];

function HomeValues() {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const linePathRef = useRef(null);
    const contentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const lastIndexRef = useRef(0);

    useGSAP(
        () => {
            if (
                !sectionRef.current ||
                !viewportRef.current ||
                !linePathRef.current ||
                !contentRef.current
            ) {
                return;
            }

            const path = linePathRef.current;
            const length = path.getTotalLength();

            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });

            gsap.set(contentRef.current, {
                opacity: 1,
                y: 0,
            });

            const trigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${VALUES_ITEM_HEIGHT * VALUE_ITEMS.length}`,
                pin: viewportRef.current,
                pinSpacing: true,
                scrub: true,
                onUpdate: (self) => {
                    const totalProgress = Math.min(
                        VALUE_ITEMS.length - 0.0001,
                        self.progress * VALUE_ITEMS.length
                    );
                    const nextIndex = Math.min(
                        VALUE_ITEMS.length - 1,
                        Math.floor(totalProgress)
                    );
                    const stageProgress = totalProgress - Math.floor(totalProgress);

                    gsap.set(path, {
                        strokeDashoffset: length * (1 - stageProgress),
                    });

                    if (nextIndex !== lastIndexRef.current) {
                        lastIndexRef.current = nextIndex;

                        gsap.fromTo(
                            contentRef.current,
                            { opacity: 0, y: 32 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.45,
                                ease: 'power2.out',
                                overwrite: 'auto',
                            }
                        );

                        setActiveIndex(nextIndex);
                    }
                },
            });

            ScrollTrigger.refresh();

            return () => {
                trigger.kill();
            };
        },
        { scope: sectionRef, dependencies: [] }
    );

    const activeItem = VALUE_ITEMS[activeIndex];

    return (
        <section
            className="home__values"
            ref={sectionRef}
            style={{ height: `${VALUES_ITEM_HEIGHT * (VALUE_ITEMS.length + 1)}px` }}
        >
            <div className="home__values-inner">
                <div ref={viewportRef} className="home__values-viewport">
                    <div className="home__values-svg-wrap" aria-hidden="true">
                        <svg
                            viewBox={`0 0 ${VALUES_FRAME_WIDTH} ${VALUES_ITEM_HEIGHT}`}
                            preserveAspectRatio="none"
                            className="home__values-svg"
                        >
                            <path
                                className="home__values-line-base"
                                d={`M${VALUES_LINE_X} 0 L${VALUES_LINE_X} ${VALUES_ITEM_HEIGHT}`}
                                strokeOpacity="0.18"
                                strokeWidth="2"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                ref={linePathRef}
                                className="home__values-line-path"
                                d={`M${VALUES_LINE_X} 0 L${VALUES_LINE_X} ${VALUES_ITEM_HEIGHT}`}
                                strokeOpacity="0.4"
                                strokeWidth="2"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    <div ref={contentRef} className="home__values-item">
                        <div className="home__values-image">
                            <img src={activeItem.image} alt={activeItem.alt} />
                        </div>
                        <div className="home__values-content">
                            <h3 className="font-serif">{activeItem.title}</h3>
                            <h4>{activeItem.subtitle}</h4>
                            <p>{activeItem.body}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeValues;
