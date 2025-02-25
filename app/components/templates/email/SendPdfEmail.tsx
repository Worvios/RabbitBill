// React-email
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

// Variables
import { BASE_URL } from "@/lib/variables";

type SendPdfEmailProps = {
  invoiceNumber: string;
};

export default function SendPdfEmail({ invoiceNumber }: SendPdfEmailProps) {
  const logo = `${BASE_URL}/assets/img/BillRabbit-logo.png`;
  return (
    <Html>
      <Head />
      <Preview>
        Votre Facture #{invoiceNumber} est prête pour le télechargement
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="bg-white border-black-950 my-10 px-10 py-4 rounded-md">
              <Img src={logo} alt="BillRabbit Logo" width={200} height={120} />
              <Heading className="leading-tight">
                Merci d'utiliser BillRabbit !
              </Heading>

              <Text>
                Nous sommes heureux de vous annoncer que votre facture{" "}
                <b>#{invoiceNumber}</b> est désormais disponible pour
                téléchargement. Vous trouverez ci-joint le document PDF.
              </Text>

              <Hr />

              <Text>
                Cordialement,
                <br />
                L'équipe CodeRabbit
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
