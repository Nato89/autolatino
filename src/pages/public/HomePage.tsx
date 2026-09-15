import WhatsAppButton from "../../components/common/whatsAppButton/whatsAppButton.tsx";
import Catalogo from "../../components/public/Catalogo/Catalogo.tsx";
import Elegirnos from "../../components/public/Elegirnos/Elegirnos.tsx";
import Hero from "../../components/public/Hero/Hero.tsx";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Elegirnos />
      <div id="catalogo">
        <Catalogo />
      </div>
      <WhatsAppButton />
    </>
  );
};

export default HomePage;

