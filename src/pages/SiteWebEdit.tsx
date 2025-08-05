import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SiteBuilderLayout } from "@/components/SiteBuilder/SiteBuilderLayout";
import { toast } from "sonner";

interface SiteData {
  id: string;
  nom: string;
  sousDomaine: string;
  description: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  couleurAccent: string;
  statut: 'published' | 'draft' | 'offline';
  logo: string | null;
  imageCouverture: string | null;
  biographie: string;
  galerie: string[];
  reseauxSociaux: {
    facebook: string;
    instagram: string;
    linkedin: string;
    website: string;
  };
  contact: {
    email: string;
    telephone: string;
    adresse: string;
  };
  theme: string;
  dateCreation: string;
  derniereModification: string;
  visites: number;
  url: string;
}

const mockSiteData: SiteData = {
  id: "1",
  nom: "Studio Photo Lumière",
  sousDomaine: "studio-lumiere",
  description: "Studio photo professionnel spécialisé dans les portraits et événements",
  couleurPrimaire: "#e91e63",
  couleurSecondaire: "#f8bbd9",
  couleurAccent: "#ad1457",
  statut: "published",
  logo: "/lovable-uploads/7285260e-899b-4817-9f82-90b6507e5c8d.png",
  imageCouverture: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
  biographie: "Photographe professionnel depuis 10 ans, je me spécialise dans les portraits, mariages et événements corporate. Mon approche artistique combine technique moderne et sensibilité créative pour capturer vos moments les plus précieux.",
  galerie: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400", 
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400",
    "https://images.unsplash.com/photo-1594736797933-d0d29a65a3d0?w=400",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=400"
  ],
  reseauxSociaux: {
    facebook: "https://facebook.com/studiolumiere",
    instagram: "https://instagram.com/studiolumiere",
    linkedin: "https://linkedin.com/company/studiolumiere",
    website: "https://studiolumiere.com"
  },
  contact: {
    email: "contact@studiolumiere.com",
    telephone: "+33 1 23 45 67 89",
    adresse: "123 Rue de la Photo\n75001 Paris\nFrance"
  },
  theme: "gallery",
  dateCreation: "2024-01-15",
  derniereModification: "2024-01-20",
  visites: 1247,
  url: "https://studio-lumiere.mondomaine.com"
};

export default function SiteWebEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setSiteData(mockSiteData);
  }, [id]);

  if (!siteData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  const handleSiteDataChange = (newData: SiteData) => {
    setSiteData(newData);
    setIsModified(true);
  };

  const handleSave = () => {
    toast.success("Site mis à jour avec succès!");
    setIsModified(false);
  };

  const handlePublish = () => {
    setSiteData(prev => prev ? { ...prev, statut: 'published' } : null);
    toast.success("Site publié avec succès!");
    setIsModified(false);
  };

  const handleUnpublish = () => {
    setSiteData(prev => prev ? { ...prev, statut: 'offline' } : null);
    toast.success("Site mis hors ligne");
    setIsModified(false);
  };

  const handleBack = () => {
    navigate("/site-web");
  };

  const handlePreview = () => {
    navigate("/site-web/preview");
  };

  const handleViewLive = () => {
    window.open(siteData.url, '_blank');
  };

  return (
    <SiteBuilderLayout
      siteData={siteData}
      onSiteDataChange={handleSiteDataChange}
      onSave={handleSave}
      onPublish={handlePublish}
      onUnpublish={handleUnpublish}
      onBack={handleBack}
      onPreview={handlePreview}
      onViewLive={siteData.statut === 'published' ? handleViewLive : undefined}
      isModified={isModified}
    />
  );
}