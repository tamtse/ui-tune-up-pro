import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Import des images d'exemple
import adminDashboard from "@/assets/admin-dashboard-real.jpg";
import dashboardInterface from "@/assets/dashboard-interface.jpg";
import financeDashboard from "@/assets/finance-dashboard-real.jpg";
import mobileInterface from "@/assets/mobile-interface.jpg";
import photographerWorkspace from "@/assets/photographer-workspace.jpg";
import userDashboard from "@/assets/user-dashboard-real.jpg";

interface ThemePreviewProps {
  themeId: string;
}

const themeTemplates = {
  gallery: {
    name: "Galerie Simple",
    description: "Design épuré avec focus sur les images",
    component: GalleryTheme
  },
  masonry: {
    name: "Masonry",
    description: "Layout créatif avec grille dynamique", 
    component: MasonryTheme
  },
  minimal: {
    name: "Minimal",
    description: "Style épuré et moderne",
    component: MinimalTheme
  }
};

function GalleryTheme() {
  // Images d'exemple pour la galerie
  const galleryImages = [
    { src: photographerWorkspace, title: "Espace de travail créatif" },
    { src: userDashboard, title: "Portrait professionnel" },
    { src: dashboardInterface, title: "Architecture moderne" },
    { src: financeDashboard, title: "Design intérieur" },
    { src: mobileInterface, title: "Nature et paysage" },
    { src: adminDashboard, title: "Art urbain" },
    { src: photographerWorkspace, title: "Photographie culinaire" },
    { src: userDashboard, title: "Mode et style" },
    { src: dashboardInterface, title: "Événement corporate" },
    { src: financeDashboard, title: "Mariage romantique" },
    { src: mobileInterface, title: "Famille et enfants" },
    { src: adminDashboard, title: "Produits lifestyle" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
            SL
          </div>
          <span className="text-xl font-semibold text-gray-800">Studio Lumière</span>
        </div>
        
        <div className="flex space-x-8">
          <span className="font-medium text-pink-500 border-b-2 border-pink-500 pb-1">GALERIE</span>
          <span className="font-medium text-gray-600 hover:text-pink-500 cursor-pointer transition-colors">À PROPOS</span>
          <span className="font-medium text-gray-600 hover:text-pink-500 cursor-pointer transition-colors">SERVICES</span>
          <span className="font-medium text-gray-600 hover:text-pink-500 cursor-pointer transition-colors">CONTACT</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-20 bg-gradient-to-b from-pink-50 to-white">
        <h1 className="text-6xl font-light text-pink-600 mb-4">Photo Gallery</h1>
        <p className="text-lg text-gray-600 tracking-wider">- CAPTURING LIFE'S PRECIOUS MOMENTS -</p>
        <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
          Découvrez notre collection de photographies professionnelles dans différents domaines : 
          portraits, événements, architecture et bien plus encore.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, i) => (
            <div key={i} className="group aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="relative w-full h-full">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-medium text-sm">{image.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-12">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full">
            Voir toute la galerie
          </Button>
        </div>
      </div>
    </div>
  );
}

function MasonryTheme() {
  // Projets créatifs avec images variées
  const portfolioProjects = [
    { src: dashboardInterface, title: "Interface Design", category: "UI/UX", height: "h-64" },
    { src: photographerWorkspace, title: "Brand Identity", category: "Branding", height: "h-80" },
    { src: adminDashboard, title: "Dashboard Analytics", category: "Data Viz", height: "h-48" },
    { src: financeDashboard, title: "Mobile App", category: "Mobile", height: "h-72" },
    { src: userDashboard, title: "E-commerce Site", category: "Web Design", height: "h-56" },
    { src: mobileInterface, title: "Logo Design", category: "Branding", height: "h-64" },
    { src: dashboardInterface, title: "Web Application", category: "Development", height: "h-80" },
    { src: photographerWorkspace, title: "Print Design", category: "Print", height: "h-48" },
    { src: adminDashboard, title: "CRM System", category: "Enterprise", height: "h-72" },
    { src: financeDashboard, title: "Marketing Campaign", category: "Marketing", height: "h-60" },
    { src: userDashboard, title: "Portfolio Website", category: "Web Design", height: "h-64" },
    { src: mobileInterface, title: "Mobile Interface", category: "Mobile", height: "h-80" },
    { src: dashboardInterface, title: "Data Visualization", category: "Analytics", height: "h-56" },
    { src: photographerWorkspace, title: "Creative Direction", category: "Art Direction", height: "h-72" },
    { src: adminDashboard, title: "SaaS Platform", category: "Product Design", height: "h-64" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
            PC
          </div>
          <span className="text-xl font-semibold text-gray-800">Portfolio Creative</span>
        </div>
        
        <div className="flex space-x-8">
          <span className="font-medium text-emerald-500 border-b-2 border-emerald-500 pb-1">WORKS</span>
          <span className="font-medium text-gray-600 hover:text-emerald-500 cursor-pointer transition-colors">ABOUT</span>
          <span className="font-medium text-gray-600 hover:text-emerald-500 cursor-pointer transition-colors">SERVICES</span>
          <span className="font-medium text-gray-600 hover:text-emerald-500 cursor-pointer transition-colors">CONTACT</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-20 bg-gradient-to-b from-emerald-50 to-white">
        <h1 className="text-6xl font-light text-emerald-600 mb-4">Creative Portfolio</h1>
        <p className="text-lg text-gray-600 tracking-wider">- INNOVATIVE DIGITAL EXPERIENCES -</p>
        <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
          Découvrez nos créations alliant design moderne et fonctionnalité. 
          Chaque projet raconte une histoire unique à travers l'innovation digitale.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {portfolioProjects.map((project, i) => (
            <div key={i} className={`${project.height} overflow-hidden rounded-lg shadow-lg break-inside-avoid group cursor-pointer hover:shadow-xl transition-all duration-300`}>
              <div className="relative w-full h-full">
                <img 
                  src={project.src} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="inline-block px-2 py-1 bg-emerald-500 text-xs font-medium rounded mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-12">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full">
            Voir tous les projets
          </Button>
        </div>
      </div>
    </div>
  );
}

function MinimalTheme() {
  // Projets minimalistes avec images épurées
  const minimalProjects = [
    { src: userDashboard, title: "Architecture moderne" },
    { src: dashboardInterface, title: "Interface épurée" },
    { src: mobileInterface, title: "Design mobile" },
    { src: photographerWorkspace, title: "Espace de travail" },
    { src: financeDashboard, title: "Données visuelles" },
    { src: adminDashboard, title: "Système admin" },
    { src: userDashboard, title: "Expérience utilisateur" },
    { src: dashboardInterface, title: "Interface web" },
    { src: mobileInterface, title: "Application mobile" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="text-center py-12 border-b border-gray-200 bg-white">
        <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto mb-6 flex items-center justify-center">
          <span className="text-white font-light text-xl">MS</span>
        </div>
        <h1 className="text-3xl font-light tracking-[0.2em] text-gray-800 mb-8">MINIMAL STUDIO</h1>
        <div className="flex justify-center space-x-16">
          <span className="text-sm tracking-[0.1em] text-gray-800 border-b border-gray-800 pb-1">PORTFOLIO</span>
          <span className="text-sm tracking-[0.1em] text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">ABOUT</span>
          <span className="text-sm tracking-[0.1em] text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">SERVICES</span>
          <span className="text-sm tracking-[0.1em] text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">CONTACT</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-20 bg-white">
        <h2 className="text-5xl font-light text-gray-800 mb-4 tracking-wide">Selected Works</h2>
        <p className="text-gray-500 tracking-[0.05em] text-lg">— CLEAN • FUNCTIONAL • TIMELESS —</p>
        <p className="text-sm text-gray-400 mt-6 max-w-xl mx-auto leading-relaxed">
          Une sélection de projets qui reflètent notre approche du design : 
          simplicité, fonctionnalité et attention aux détails.
        </p>
      </div>

      {/* Minimal Grid */}
      <div className="max-w-5xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {minimalProjects.map((project, i) => (
            <div key={i} className="group">
              <div className="aspect-square overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer">
                <img 
                  src={project.src} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-sm font-light text-gray-800 tracking-[0.05em] group-hover:text-gray-600 transition-colors">
                  {project.title.toUpperCase()}
                </h3>
                <div className="w-8 h-px bg-gray-300 mx-auto mt-2 group-hover:w-12 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action minimal */}
        <div className="text-center mt-16">
          <Button variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-12 py-3 rounded-none tracking-[0.05em] text-sm font-light">
            VIEW ALL WORKS
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ThemePreview() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const theme = themeId ? themeTemplates[themeId as keyof typeof themeTemplates] : null;

  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Thème non trouvé</h1>
          <p className="text-muted-foreground mb-4">Le thème demandé n'existe pas.</p>
          <Button onClick={() => navigate('/site-web')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const ThemeComponent = theme.component;

  return (
    <div className="min-h-screen">
      {/* Header de contrôle */}
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/site-web')}
              className="text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="font-semibold">Aperçu du thème : {theme.name}</h1>
              <p className="text-sm text-gray-300">{theme.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(`/site-web/edit/1?theme=${themeId}`, '_blank')}
              className="text-white border-white hover:bg-white hover:text-gray-900"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Utiliser ce thème
            </Button>
          </div>
        </div>
      </div>

      {/* Thème */}
      <ThemeComponent />

      {/* Footer informatif */}
      <div className="bg-gray-100 p-6 text-center border-t">
        <p className="text-sm text-gray-600">
          Ceci est un aperçu du thème <strong>{theme.name}</strong>. 
          Les contenus affichés sont des exemples et peuvent être personnalisés.
        </p>
      </div>
    </div>
  );
}