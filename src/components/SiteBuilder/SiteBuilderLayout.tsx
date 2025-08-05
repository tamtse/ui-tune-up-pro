import { useState } from "react";
import { BuilderHeader } from "./BuilderHeader";
import { BuilderSidebar } from "./BuilderSidebar";
import { DesignSection } from "./sections/DesignSection";
import { ContentSection } from "./sections/ContentSection";
import { MediaSection } from "./sections/MediaSection";
import { ScrollArea } from "@/components/ui/scroll-area";
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
}

interface SiteBuilderLayoutProps {
  siteData: SiteData;
  onSiteDataChange: (data: SiteData) => void;
  onSave: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  onBack: () => void;
  onPreview: () => void;
  onViewLive?: () => void;
  isModified: boolean;
}

export function SiteBuilderLayout({
  siteData,
  onSiteDataChange,
  onSave,
  onPublish,
  onUnpublish,
  onBack,
  onPreview,
  onViewLive,
  isModified
}: SiteBuilderLayoutProps) {
  const [activeSection, setActiveSection] = useState('design');

  const handleFieldChange = (field: string, value: any) => {
    onSiteDataChange({
      ...siteData,
      [field]: value
    });
  };

  const handleNestedFieldChange = (parent: string, field: string, value: string) => {
    const parentObj = siteData[parent as keyof SiteData] as Record<string, any>;
    onSiteDataChange({
      ...siteData,
      [parent]: { ...parentObj, [field]: value }
    });
  };

  const handleColorChange = (type: 'primary' | 'secondary' | 'accent', color: string) => {
    const colorMap = {
      primary: 'couleurPrimaire',
      secondary: 'couleurSecondaire',
      accent: 'couleurAccent'
    };
    handleFieldChange(colorMap[type], color);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'design':
        return (
          <DesignSection
            selectedTheme={siteData.theme}
            onThemeChange={(theme) => handleFieldChange('theme', theme)}
            colors={{
              primary: siteData.couleurPrimaire,
              secondary: siteData.couleurSecondaire,
              accent: siteData.couleurAccent
            }}
            onColorChange={handleColorChange}
          />
        );
      case 'content':
        return (
          <ContentSection
            siteName={siteData.nom}
            description={siteData.description}
            biography={siteData.biographie}
            logo={siteData.logo}
            coverImage={siteData.imageCouverture}
            contact={siteData.contact}
            socialLinks={siteData.reseauxSociaux}
            onFieldChange={handleFieldChange}
            onNestedFieldChange={handleNestedFieldChange}
          />
        );
      case 'media':
        return (
          <MediaSection
            gallery={siteData.galerie}
            onGalleryChange={(images) => handleFieldChange('galerie', images)}
          />
        );
      case 'pages':
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Gestion des pages</h3>
            <p className="text-muted-foreground">Section en cours de développement</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Paramètres</h3>
            <p className="text-muted-foreground">Section en cours de développement</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BuilderHeader
        siteName={siteData.nom}
        subdomain={siteData.sousDomaine}
        status={siteData.statut}
        isModified={isModified}
        onBack={onBack}
        onPreview={onPreview}
        onSave={onSave}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
        onViewLive={onViewLive}
      />
      
      <div className="flex h-[calc(100vh-73px)]">
        <BuilderSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-6">
              {renderActiveSection()}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}