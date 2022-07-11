import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from '@emotion/styled';


import { useCallback, useRef, useState } from "react";

const image = importAll(require.context("../public/img/carousel"));

function importAll(r) {
  let img = [];
  r.keys().forEach((item, index) => {
    img[index] = r(item).default.src;
  });

  return img;
}

export default function App() {
  const slickRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevEvent = useCallback((i) => {
    slickRef.current.slickPrev();
  }, []);
  const nextEvent = (i) => {
    slickRef.current.slickNext();
  };

  function SampleNextArrow() {
    return (
      <NextBtn onClick={nextEvent}>
        <img src="/img/next.png" alt="next" />
      </NextBtn>
    );
  }

  function SamplePrevArrow() {
    return (
      <PrevBtn onClick={prevEvent}>
        <img src="/img/next.png" alt="next" />
      </PrevBtn>
    );
  }

  const customDot = (i) => {
    const imgSrc = image[i];

    let show = i > currentSlide - 3 && i < currentSlide + 3;

    if (currentSlide < 2) {
      show = i < 5;
    }

    return show ? <Paging src={imgSrc}></Paging> : <span />;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: customDot,
  };
  return (
    <Page>
      <StyledSlider
        beforeChange={(slide, newSlide) => {
          setCurrentSlide(newSlide);
        }}
        ref={slickRef}
        {...settings}
      >
        {image.map((img, index) => (
          <div key={index}>
            <img src={img} width={500} height={500} alt="carousel" />
          </div>
        ))}
      </StyledSlider>
      <SampleNextArrow />
      <SamplePrevArrow />
    </Page>
  );
}

const Page = styled.div`
  width: 500px;
  margin: 100px;
`;

const NextBtn = styled.div`
  img {
    width: 30px;
  }
  img:hover {
    transform: scale(1.1);
  }
  position: absolute;
  top: 335px;
  left: 565px;
`;

const PrevBtn = styled(NextBtn)`
  transform: rotate(180deg);

  img:hover {
    transform: scale(1.1);
  }
  position: absolute;
  top: 335px;
  left: 105px;
`;

const Paging = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background: url(${(props) => props.src}) no-repeat;
  background-size: 100% 100%;
  filter: grayscale(1);
  margin: 10px 8px;
  width: 40px;
  height: 40px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
  }

  .slick-dots li {
    width: fit-content;
    height: fit-content;
    margin: 0;
  }
  .slick-dots li.slick-active span {
    filter: grayscale(0);
    transform: scale(1.3);
  }
`;
