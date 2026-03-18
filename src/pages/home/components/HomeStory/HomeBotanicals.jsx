import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeBotanicals 컴포넌트
 * 
 * 대규모 횡스크롤 애니메이션 섹션입니다.
 * 사용자가 제공한 7개의 패스 데이터를 완벽하게 정렬하여 [강하 -> 분기 -> 수렴] 흐름을 만듭니다.
 * 모든 브랜치가 시작선의 끝점(2292.383, 1643.43)에서 정확히 시작하도록 개별 오프셋을 적용했습니다.
 */
function HomeBotanicals() {
    const sectionRef = useRef(null);
    const horizontalRef = useRef(null);
    const svgRef = useRef(null);

    const startRef = useRef(null);
    const branchRefs = useRef([]);
    const mergePathRef = useRef(null);
    const bottleRef = useRef(null);
    const textPathRef = useRef(null);
    const bottleImgRef = useRef(null);

    const [activeIngredient, setActiveIngredient] = useState(null);

    // 각 브랜치의 데이터와 시작점 정렬을 위한 Y 오프셋 계산
    // 시작점 목표: (2292.383, 1643.43). 
    // 기본 X 오프셋은 2291.383 (1620 + 672.383 - 1).
    // Y 오프셋은 1643.43 - (원래 시작점 Y)
    const branches = [
        {
            id: 'rosemary', label: 'Rosemary Leaf', color: '#b5a195',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
            d: "M 1 463.933 C 106.747 479.142, 356.605 479.464, 595.229 419.421 C 829.368 339.4, 1063.86 245.604, 1111.21 228.299 C 1299.59 153.78, 1679.76 36.2489, 1802.92 11.7425 C 1878.9 -3.37781, 2150.48 -1.76105, 2212.3 11.7425 C 2335.49 38.653, 2418.2 100.266, 2478.56 126.273 C 2538.92 152.279, 2582.24 200.792, 2734.61 241.803 C 2886.97 282.814, 3146.8 288.915, 3319.12 378.433",
            yOffset: 1643.43 - 463.933,
            endY: 378.433
        },
        {
            id: 'chamomile', label: 'Chamomile', color: '#887469',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
            d: "M 1 263.037 L 332.857 299.975 C 443.887 303.766, 476.671 302.015, 567.97 291.473 C 788.524 266.005, 959.337 196.948, 1118.03 162.439 C 1118.03 162.439, 1529.62 18.0081, 1802.92 7.39859 C 1996.17 -0.103381, 2040.95 -2.1039, 2184.06 7.39859 C 2327.17 16.9011, 2400.65 14.5244, 2512.12 65.0376 C 2623.59 115.551, 2654 116.759, 2749.12 126.538 C 2802.62 132.038, 3125.87 97.5167, 3319.12 177.538",
            yOffset: 1643.43 - 263.037,
            endY: 177.538
        },
        {
            id: 'bergamot', label: 'Bergamot', color: '#a3ad92',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
            d: "M 1 103.292 L 350.381 157.734 C 350.381 157.734, 561.655 177.303, 683.822 157.734 C 805.989 138.165, 965.564 112.671, 1118.03 103.72 C 1305.43 92.7172, 1538.25 38.0998, 1809.73 27.7002 C 1955.82 22.1042, 2049.71 27.7002, 2184.06 27.7002 C 2318.41 27.7002, 2370.98 27.7002, 2466.39 42.204 C 2588.85 60.8195, 2571.54 51.2063, 2729.25 51.2063 C 2886.97 51.2063, 3097.15 -34.2216, 3319.12 17.792",
            yOffset: 1643.43 - 103.292,
            endY: 17.792
        },
        {
            id: 'lavender', label: 'Lavender', color: '#b9a8cf',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
            d: "M 1 90.0204 L 381.048 171.47 C 666.766 207.327, 806.003 171.47, 1118.03 171.47 C 1430.05 171.47, 1560.99 201.978, 1814.6 201.978 C 2063.23 201.978, 2040.95 202.978, 2188.93 202.978 C 2336.91 202.978, 2386.07 186.474, 2478.56 173.971 C 2604.46 156.951, 2624.59 137.961, 2734.61 112.455 C 2844.62 86.948, 3142.91 -19.5706, 3319.12 4.5208",
            yOffset: 1643.43 - 90.0204,
            endY: 4.5208
        },
        {
            id: 'petitgrain', label: 'Petitgrain', color: '#97a58c',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
            d: "M 1 86.7249 C 1 86.7249, 336.866 185.511, 555.8 225.19 C 755.681 261.415, 749.537 252.697, 1071.3 293.207 C 1393.05 333.718, 1405.71 346.721, 1802.92 346.721 C 2200.13 346.721, 2032.68 346.721, 2168.49 346.721 C 2293.25 346.721, 2478.56 267.701, 2478.56 267.701 C 2478.56 267.701, 2585.17 231.691, 2713.67 181.178 C 2842.18 130.665, 3184.77 -5.27634, 3319.12 1.22536",
            yOffset: 1643.43 - 86.7249,
            endY: 1.22536
        }
    ];

    useGSAP(() => {
        const horizontalWidth = 5659;
        const baseHeight = 2539;
        const scale = window.innerHeight / baseHeight;
        const scaledWidth = horizontalWidth * scale;
        const scrollLength = window.innerHeight * 7;

        const allPaths = [startRef.current, ...branchRefs.current, mergePathRef.current, bottleRef.current];
        gsap.set(allPaths, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 1, visibility: 'visible' });

        gsap.set(horizontalRef.current, { scale: scale, transformOrigin: 'left top' });
        gsap.set(bottleImgRef.current, { opacity: 0, filter: 'blur(10px)', scale: 0.95 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${scrollLength}`,
                pin: true,
                scrub: 1.5,
                anticipatePin: 1
            }
        });

        tl.to(startRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, 0)
            .to(textPathRef.current, { attr: { startOffset: '55%' }, ease: 'none', duration: 2.5 }, 0.2)
            .to(horizontalRef.current, { x: -(scaledWidth - window.innerWidth) / scale, ease: 'none', duration: 4.5 }, 1.2)
            .to(branchRefs.current, { strokeDashoffset: 0, stagger: 0.2, duration: 2, ease: 'power1.inOut' }, '>-3.0')
            .to(mergePathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'none' }, '>-0.5')
            .to(bottleRef.current, { strokeDashoffset: 0, duration: 2, ease: 'power2.out' }, '>-0.2')
            .to(bottleImgRef.current, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.5, ease: 'back.out(1.5)' }, '>-0.5');

    }, { scope: sectionRef });

    return (
        <section className="home__botanicals" ref={sectionRef}>
            <div className="home__botanicals-horizontal" ref={horizontalRef}>
                <div className="home__botanicals-canvas">
                    <svg ref={svgRef} viewBox="0 0 5659 2539" className="home__botanicals-svg" preserveAspectRatio="xMinYMin slice">
                        {/* 시작 패스: x=1621 지점에 정렬 */}
                        <path
                            id="startPath"
                            ref={startRef}
                            className="hero-flow__path"
                            d="M 1 1 L 1 1001.26 C 0.999837 1189.31, 170.908 1585.38, 672.383 1643.43"
                            transform="translate(1620, 0)"
                            pathLength="1"
                            stroke="#603b2d" strokeWidth="2.5" strokeLinecap="round" fill="none"
                            vectorEffect="non-scaling-stroke"
                        />

                        <text className="font-serif home__botanicals-path-text" fill="#603b2d" fontSize="60">
                            <textPath href="#startPath" ref={textPathRef} startOffset="0%">
                                'If the Path be beautiful, let us not ask where it leads.'
                            </textPath>
                        </text>

                        {/* 갈래 선들: 각 브랜치를 시작선 끝점(2292.383, 1643.43)에 개별적으로 맞춤 */}
                        {branches.map((branch, i) => (
                            <path
                                key={branch.id}
                                ref={el => branchRefs.current[i] = el}
                                className="hero-flow__path branch-path"
                                d={branch.d}
                                transform={`translate(2291.383, ${branch.yOffset})`}
                                pathLength="1"
                                stroke="#603b2d" strokeWidth="1.5" strokeLinecap="round" fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                        ))}

                        {/* 합쳐짐 패스: 마지막 갈래(Petitgrain) 끝점에 연결 */}
                        <path
                            ref={mergePathRef}
                            className="hero-flow__path"
                            d="M 1 1001.26 C 0.999837 1189.31, 170.908 1585.38, 672.383 1643.43"
                            transform={`translate(${2291.383 + 3319.12 - 1}, ${branches[4].yOffset + 1.22536 - 1001.26})`}
                            pathLength="1"
                            stroke="#603b2d" strokeWidth="2" strokeLinecap="round" fill="none"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* 최종 병 실루엣 */}
                        <path
                            ref={bottleRef}
                            className="hero-flow__path"
                            d="M 5612 1821 C 5592 1841, 5577 1871, 5572 1911 L 5562 2031 C 5557 2111, 5542 2241, 5547 2401 C 5552 2561, 5562 2721, 5577 2841 C 5587 2921, 5622 2981, 5702 3006 C 5762 3026, 5862 3036, 5962 3036 C 6062 3036, 6162 3026, 6222 3006 C 6302 2981, 6337 2921, 6347 2841 C 6362 2721, 6372 2561, 6377 2401 C 6382 2241, 6367 2111, 6362 2031 L 6352 1911 C 6347 1871, 6332 1841, 6312 1821 C 6282 1786, 6257 1756, 6247 1711 C 6232 1646, 6237 1561, 6257 1501 C 6272 1451, 6287 1411, 6282 1361 C 6277 1301, 6247 1256, 6202 1231 C 6152 1203, 6072 1191, 5962 1191 C 5852 1191, 5772 1203, 5722 1231 C 5677 1256, 5647 1301, 5642 1361 C 5637 1411, 5652 1451, 5667 1501 C 5687 1561, 5692 1646, 5677 1711 C 5667 1756, 5642 1786, 5612 1821 Z"
                            pathLength="1"
                            stroke="#603b2d" strokeWidth="1.5" strokeLinecap="round" fill="none"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    {/* 성분 호버 지점들 */}
                    <div className="home__botanicals-interactive">
                        {branches.map((branch) => (
                            <div
                                key={branch.id}
                                className={`ingredient-point ${activeIngredient === branch.id ? 'is-active' : ''}`}
                                style={{
                                    left: 2291.383 + 3319.12,
                                    top: branch.yOffset + branch.endY
                                }}
                                onMouseEnter={() => setActiveIngredient(branch.id)}
                                onMouseLeave={() => setActiveIngredient(null)}
                            >
                                <span className="ingredient-label font-serif" style={{ color: branch.color }}>{branch.label}</span>
                                <div className="ingredient-image-wrap">
                                    <img src={branch.image} alt={branch.label} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 최종 병 이미지 */}
                    <div className="home__botanicals-final-bottle" style={{ left: 5962, top: 1191, width: 600 }}>
                        <div className="product-appearance">
                            <img
                                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
                                alt="Final Product"
                                ref={bottleImgRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBotanicals;
