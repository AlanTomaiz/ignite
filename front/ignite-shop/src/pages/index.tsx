import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, ProductBox } from "../styles/(pages)/home"

import camiseta1 from '../assets/camisetas/t-shirt-1.png'
import camiseta2 from '../assets/camisetas/t-shirt-2.png'
import camiseta3 from '../assets/camisetas/t-shirt-3.png'
import camiseta4 from '../assets/camisetas/t-shirt-4.png'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <ProductBox className="keen-slider__slide">
        <Image src={camiseta1} width={520} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>$79.90</span>
        </footer>
      </ProductBox>

      <ProductBox className="keen-slider__slide">
        <Image src={camiseta2} width={520} alt="" />
        <footer>
          <strong>Camiseta Y</strong>
          <span>$79.90</span>
        </footer>
      </ProductBox>

      <ProductBox className="keen-slider__slide">
        <Image src={camiseta3} width={520} alt="" />
        <footer>
          <strong>Camiseta Z</strong>
          <span>$79.90</span>
        </footer>
      </ProductBox>

      <ProductBox className="keen-slider__slide">
        <Image src={camiseta4} width={520} alt="" />
        <footer>
          <strong>Camiseta Z</strong>
          <span>$79.90</span>
        </footer>
      </ProductBox>
    </HomeContainer>
  )
}
