import WhatsAppButton from "../../components/common/whatsAppButton/whatsAppButton.tsx";
import Catalogo from "../../components/public/Catalogo/Catalogo.tsx";
import Elegirnos from "../../components/public/Elegirnos/Elegirnos.tsx";
import Hero from "../../components/public/Hero/Hero.tsx";
import Credito from "../../components/public/Credito/Credito.tsx";
import Contacto from "../../components/public/Contacto/Contacto.tsx";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Elegirnos />
      <div id="catalogo">
        <Catalogo />
      </div>
      <Credito />
      <Contacto />
      <WhatsAppButton />
    </>
  );
};

export default HomePage;

