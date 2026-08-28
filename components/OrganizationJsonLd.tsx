import contactContent from "@/data/contact.json";
import generalContent from "@/data/general.json";
import type { ContactContent, GeneralContent } from "@/data/types";
import { siteDescription, siteName, siteNameZh, siteUrl } from "@/lib/site";

const contact: ContactContent = contactContent;
const general: GeneralContent = generalContent;

/**
 * Structured data describing the school.
 *
 * This is what lets Google understand that the site belongs to a real place
 * with an address and a phone number, rather than treating it as an anonymous
 * page — which is most of the difference between appearing and not appearing
 * for a search like "maths tutor Epping".
 *
 * Everything is derived from data/contact.json so it can never drift out of
 * sync with the address shown in the footer.
 */
const OrganizationJsonLd = () => {
  const { postal } = contact;

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: siteNameZh,
    description: siteDescription,
    url: siteUrl,
    logo: `${siteUrl}${general.logo}`,
    image: `${siteUrl}${contact.buildingPhoto}`,
    email: contact.email,
    telephone: contact.mobile,
    address: {
      "@type": "PostalAddress",
      streetAddress: postal.street,
      addressLocality: postal.locality,
      addressRegion: postal.region,
      postalCode: postal.postcode,
      addressCountry: postal.country,
    },
    hasMap: contact.mapUrl,
    areaServed: [
      "Epping NSW",
      "Eastwood NSW",
      "Carlingford NSW",
      "North Sydney",
    ],
    knowsLanguage: ["en", "zh"],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from our own content files, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationJsonLd;
