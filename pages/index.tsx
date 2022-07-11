import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { useCallback, useRef, useState } from "react";

const image: string[] = importAll();

function importAll() {
  const img = [...Array(25).fill(0)].map((_, i): string => {
    return `/img/carousel/cat${i}.jpeg`;
  });

  return img;
}

const App = () => {
  const slickRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const prevEvent = useCallback(() => {
    if (slickRef && slickRef.current) {
      slickRef.current.slickPrev();
    }
  }, []);

  const nextEvent = useCallback(() => {
    if (slickRef && slickRef.current) {
      slickRef.current.slickNext();
    }
  }, []);

  const SampleNextArrow = () => {
    return (
      <NextBtn onClick={nextEvent}>
        <img src="/img/next.png" alt="next" />
      </NextBtn>
    );
  };

  const SamplePrevArrow = () => {
    return (
      <PrevBtn onClick={prevEvent}>
        <img src="/img/next.png" alt="next" />
      </PrevBtn>
    );
  };

  const customDot = (i: number) => {
    const imgSrc = image[i];

    let show = i > currentSlide - 3 && i < currentSlide + 3;

    if (currentSlide < 2) {
      show = i < 5;
    }

    return show ? <Paging img={imgSrc}></Paging> : <span />;
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
        beforeChange={(_, newSlide) => {
          setCurrentSlide(newSlide);
        }}
        ref={slickRef}
        {...settings}
      >
        {image.map((img, index) => (
          <div key={index}>
            <MainImage src={img} alt="carousel" />
          </div>
        ))}
      </StyledSlider>
      <SampleNextArrow />
      <SamplePrevArrow />
    </Page>
  );
};

const MainImage = styled.img`
  width: 500px;
  height: 500px;
`;

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
  background-image: url(${({ img }: { img: string }) => img});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  filter: grayscale(1);
  margin: 10px 8px;
  width: 40px;
  height: 40px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide > div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
  }

  .slick-dots > li {
    width: fit-content;
    height: fit-content;
    margin: 0;
  }

  .slick-dots > li.slick-active span {
    filter: grayscale(0);
    transform: scale(1.3);
  }
`;

export default App;
