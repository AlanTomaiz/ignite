import Image from 'next/image'

import { HomeContainer, ProductBox } from "../styles/(pages)/home"

import camiseta1 from '../assets/camisetas/t-shirt-1.png'
import camiseta2 from '../assets/camisetas/t-shirt-2.png'
import camiseta3 from '../assets/camisetas/t-shirt-3.png'
import camiseta4 from '../assets/camisetas/t-shirt-4.png'

export default function Home() {
  return (
    <HomeContainer>
      <ProductBox>
        <Image src={camiseta1} width={520} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>$79.90</span>
        </footer>
      </ProductBox>

      <ProductBox>
        <Image src={camiseta2} width={520} alt="" />
        <footer>
          <strong>Camiseta Y</strong>
          <span>$79.90</span>
        </footer>
      </ProductBox>
    </HomeContainer>
  )
}
