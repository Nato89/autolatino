import WhatsAppButton from "../../components/common/whatsAppButton/whatsAppButton.tsx";
import Catalogo from "../../components/public/Catalogo/Catalogo.tsx";
import Elegirnos from "../../components/public/Elegirnos/Elegirnos.tsx";
import Hero from "../../components/public/Hero/Hero.tsx";
import Credito from "../../components/public/Credito/Credito.tsx";
import Contacto from "../../components/public/Contacto/Contacto.tsx";
import Footer from "../../components/common/Footer/Footer.tsx";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Elegirnos />
      <div id="catalogo">
        <Catalogo />
      </div>
      <div id="credito">
        <Credito />
      </div>
      <div id="contacto">
        <Contacto />
      </div>  
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default HomePage;

