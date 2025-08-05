import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VitrineData {
  nom: string;
  subtitle: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  couleurAccent: string;
  logo: string | null;
  galerie: string[];
  biographie: string;
  contact: {
    email: string;
    telephone: string;
    adresse: string;
  };
  customPages?: {
    about?: {
      enabled: boolean;
      content?: string;
    };
    contact?: {
      enabled: boolean;
      content?: string;
    };
    gallery?: {
      enabled: boolean;
      images?: string[];
    };
  };
}

const VitrinePreview = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'gallery' | 'about' | 'contact'>('gallery');
  
  // Mock data - en production cela viendrait de la base de données
  const [vitrineData] = useState<VitrineData>({
    nom: "Deep Wedding",
    subtitle: "SHARING MOMENTS",
    couleurPrimaire: "#e91e63",
    couleurSecondaire: "#f8bbd9",
    couleurAccent: "#ad1457",
    logo: null,
    galerie: [
      "/lovable-uploads/7285260e-899b-4817-9f82-90b6507e5c8d.png",
      // Placeholder images pour la démo
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400"
    ],
    biographie: "Nous sommes spécialisés dans la photographie de mariage, capturant vos moments les plus précieux avec passion et créativité. Notre approche combine l'élégance classique avec une touche moderne pour créer des souvenirs intemporels.",
    contact: {
      email: "contact@deepwedding.com",
      telephone: "+33 1 23 45 67 89",
      adresse: "123 Rue de la Photographie, 75001 Paris"
    },
    customPages: {
      about: { enabled: true },
      contact: { enabled: true },
      gallery: { enabled: false }
    }
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(vitrineData.galerie);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const NavBar = () => (
    <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: vitrineData.couleurPrimaire }}
        >
          {vitrineData.nom.charAt(0)}
        </div>
        <span className="text-xl font-semibold text-gray-800">{vitrineData.nom}</span>
      </div>
      
      <div className="flex space-x-8">
        <button 
          onClick={() => setCurrentPage('gallery')}
          className={`font-medium transition-colors ${
            currentPage === 'gallery' ? 'text-primary' : 'text-gray-600 hover:text-gray-800'
          }`}
          style={{ color: currentPage === 'gallery' ? vitrineData.couleurPrimaire : undefined }}
        >
          GALERIE
        </button>
        <button 
          onClick={() => setCurrentPage('about')}
          className={`font-medium transition-colors ${
            currentPage === 'about' ? 'text-primary' : 'text-gray-600 hover:text-gray-800'
          }`}
          style={{ color: currentPage === 'about' ? vitrineData.couleurPrimaire : undefined }}
        >
          À PROPOS
        </button>
        <button 
          onClick={() => setCurrentPage('contact')}
          className={`font-medium transition-colors ${
            currentPage === 'contact' ? 'text-primary' : 'text-gray-600 hover:text-gray-800'
          }`}
          style={{ color: currentPage === 'contact' ? vitrineData.couleurPrimaire : undefined }}
        >
          CONTACT
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Sunday, August 26, 2018</span>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: vitrineData.couleurSecondaire }}
        >
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    </nav>
  );

  const GalleryPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center py-20">
        <h1 
          className="text-6xl font-light mb-4"
          style={{ color: vitrineData.couleurPrimaire }}
        >
          Photo Gallery
        </h1>
        <p className="text-lg text-gray-600 tracking-wider">- {vitrineData.subtitle} -</p>
      </div>

      {isEditMode && (
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Gestion des Images</h3>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Ajouter des images
                </Button>
              </label>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={image} 
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {isEditMode && (
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-light mb-4"
            style={{ color: vitrineData.couleurPrimaire }}
          >
            À Propos
          </h1>
          <p className="text-lg text-gray-600 tracking-wider">- Notre Histoire -</p>
        </div>
        
        <Card className="p-8">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {vitrineData.biographie}
          </p>
        </Card>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-light mb-4"
            style={{ color: vitrineData.couleurPrimaire }}
          >
            Contact
          </h1>
          <p className="text-lg text-gray-600 tracking-wider">- Parlons de votre projet -</p>
        </div>
        
        <Card className="p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: vitrineData.couleurPrimaire }}>
                Email
              </h3>
              <p className="text-gray-700">{vitrineData.contact.email}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: vitrineData.couleurPrimaire }}>
                Téléphone
              </h3>
              <p className="text-gray-700">{vitrineData.contact.telephone}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: vitrineData.couleurPrimaire }}>
                Adresse
              </h3>
              <p className="text-gray-700">{vitrineData.contact.adresse}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header de contrôle admin */}
      <div className="bg-gray-100 border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/site-web')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la gestion
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Prévisualisation du site vitrine</span>
            <Button
              variant={isEditMode ? "destructive" : "default"}
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              {isEditMode ? "Quitter l'édition" : "Mode édition"}
            </Button>
          </div>
        </div>
      </div>

      {/* Site vitrine */}
      <div className="bg-white">
        <NavBar />
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>
    </div>
  );
};

export default VitrinePreview;