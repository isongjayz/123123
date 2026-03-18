import Aegung_SpecialStore_CardText from "./Aegung_SpecialStore_CardText";
import "./Aegung_SpecialStores.scss";

const cardTextData = [
  {
    id: 1,
    title: "이솝 삼청",
    description:
      "삼청동의 깊고 고즈넉한 밤, 달빛을 머금은 기와지붕과 처마가 인상적인 이곳은 전통 한옥의 정취를 현대적으로 재해석하여, 섬세한 문살과 어우러진 유리 파사드, 옹기와 석등은 전통과 현대가 공존하는 한국의 아름다움을 시각적으로 전합니다.",
    image: "/images/aegung/05-SpecialStores/StoreItem01.png",
  },
  {
    id: 2,
    title: "이솝 사운즈 한남",
    description:
      "전통 창호와 보자기의 미학을 현대적으로 재해석한 이솝 사운즈 한남은 비움과 채움의 조화를 보여줍니다. 정갈한 격자무늬와 은은한 빛이 어우러진 이곳에서, 한국의 고전적인 평온함과 이솝의 감각적인 휴식을 동시에 경험해 보세요.",
    align: "right",
    image: "/images/aegung/05-SpecialStores/StoreItem02.png",
  },
  {
    id: 3,
    title: "이솝 서촌",
    description:
      "서촌의 골목 끝, 단아한 한옥의 정취를 담은 이솝 서촌입니다. 기와와 서까래가 만드는 여백의 미 속에 자연스럽게 녹아든 향기와 온기를 느껴보세요. 과거의 시간과 현재의 감각이 조화롭게 공존하는 이곳에서 가장 한국적인 휴식을 제안합니다.",
    image: "/images/aegung/05-SpecialStores/StoreItem03.png",
  },
  {
    id: 4,
    title: "이솝 가로수길",
    description:
      "전통 건축의 격자무늬 문살과 단청의 색감을 현대적으로 재해석한 이솝 가로수길 매장은 고요한 평온함을 전하는 공간입니다. 은은한 빛과 절제된 외관은 화려한 거리와 대비되는 정돈된 여백의 미를 보여주며, 거친 석재와 따뜻한 목재의 질감이 어우러져  입체적인 휴식을 선사합니다.",
    align: "right",
    image: "/images/aegung/05-SpecialStores/StoreItem04.png",
  },
  {
    id: 5,
    title: "이솝 롯데월드몰",
    description:
      "직선과 곡선이 조화를 이루는 이솝 롯데월드몰 매장은 한국의 정갈한 목공예와 보자기의 질감을 현대적으로 재구성한 공간이며, 화려한 도심 속에서도 마음을 차분히 가라앉히는 여백의 미를 담고 있습니다.",
    image: "/images/aegung/05-SpecialStores/StoreItem05.png",
  },
  {
    id: 6,
    title: "이솝 성수",
    description:
      "성수의 붉은 벽돌 풍경 속에, 한국의 정갈한 결이 스며들어 섬세한 목재 가구와 전통적인 여백의 미는 바쁜 도심 속 숨 고르기를 제안합니다. 성수만의 빈티지한 감성과 이솝의 정제된 미학이 만나 탄생한 이 특별한 공간입니다.",
    align: "right",
    image: "/images/aegung/05-SpecialStores/StoreItem06.png",
  },
  {
    id: 7,
    title: "이솝 파르나스",
    description:
      "서촌의 골목 끝, 단아한 한옥의 정취를 담은 이솝 서촌입니다. 기와와 서까래가 만드는 여백의 미 속에 자연스럽게 녹아든 향기와 온기를 느껴보세요. 과거의 시간과 현재의 감각이 조화롭게 공존하는 이곳에서 가장 한국적인 휴식을 제안합니다.",
    align: "right",
    image: "/images/aegung/05-SpecialStores/StoreItem07.png",
  },
];

const Aegung_SpecialStores = () => {
  const card1 = cardTextData.find((item) => item.id === 1);

  return (
    <section className="Aegung_specialStores">
      <div className="Aegung_specialStores__visual">
        <img
          className="Aegung_specialStores__visual-bg"
          src="/images/aegung/05-SpecialStores/MainVisual.png"
          alt="Korean Special Store"
        />

        {/* 왼쪽 텍스트 박스 */}
        <div className="Aegung_specialStores__visual-textbox">
          <div className="Aegung_specialStores__visual-top">
            <span className="Aegung_specialStores__visual-label">
              [Korea Special Stores]
            </span>
            <h2 className="Aegung_specialStores__visual-title">
              고궁 곁에 머무는 공간
            </h2>
          </div>

          <div className="Aegung_specialStores__visual-bottom">
            <h3 className="Aegung_specialStores__visual-subtitle">
              산책의 여운을 담은 공간,
              <br />
              이솝의 Korean Special Store
            </h3>
            <p className="Aegung_specialStores__visual-desc">
              도심 속 고궁이 주는 여유로움을
              <br />
              이솝 스토어에서 온전히 경험해 보세요.
              <br />
              한국 전통 건축의 미학을 존중하며 다듬어진 공간들은
              <br />
              번잡함에서 벗어난 온전한 쉼을 제공합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="Aegung_specialStores__bottom">
        {card1 && (
          <div className="Aegung_specialStores__card__wrap">
            <div
              className={`Aegung_specialStores__card__wrap__text ${card1.align === "right" ? "Aegung_specialStores__card--right" : ""}`}
            >
              <Aegung_SpecialStore_CardText
                title={card1.title}
                description={card1.description}
                align={card1.align || "left"}
                descWidth="300px"
              />
              <div className="Aegung_specialStores__card-connector__card1">
                <span className="Aegung_specialStores__card-dot"></span>
                <span className="Aegung_specialStores__card-line__card1"></span>
              </div>
            </div>
            <div className="Aegung_specialStores__card-image__card1">
              <img src={card1.image} alt={card1.title} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Aegung_SpecialStores;
