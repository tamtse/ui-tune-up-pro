import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-semibold text-gray-800">Studio Photo Lumière</span>
        </div>
        
        <div className="flex space-x-8">
          <span className="font-medium text-pink-500">GALERIE</span>
          <span className="font-medium text-gray-600">À PROPOS</span>
          <span className="font-medium text-gray-600">CONTACT</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-6xl font-light text-pink-500 mb-4">Photo Gallery</h1>
        <p className="text-lg text-gray-600 tracking-wider">- SHARING MOMENTS -</p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <span className="text-pink-400 text-2xl">📸</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MasonryTheme() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-semibold text-gray-800">Portfolio Creative</span>
        </div>
        
        <div className="flex space-x-8">
          <span className="font-medium text-emerald-500">WORKS</span>
          <span className="font-medium text-gray-600">ABOUT</span>
          <span className="font-medium text-gray-600">CONTACT</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-20 bg-gradient-to-b from-emerald-50 to-white">
        <h1 className="text-6xl font-light text-emerald-500 mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-600 tracking-wider">Creative Works</p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {Array.from({length: 15}).map((_, i) => {
            const heights = ['h-64', 'h-80', 'h-48', 'h-72'];
            const randomHeight = heights[i % heights.length];
            return (
              <div key={i} className={`${randomHeight} overflow-hidden rounded-lg shadow-lg break-inside-avoid`}>
                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <span className="text-emerald-400 text-2xl">🎨</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MinimalTheme() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-gray-800 mx-auto mb-4"></div>
        <h1 className="text-2xl font-light tracking-widest text-gray-800">MINIMAL STUDIO</h1>
        <div className="flex justify-center space-x-12 mt-8">
          <span className="text-sm tracking-wide text-gray-800">PORTFOLIO</span>
          <span className="text-sm tracking-wide text-gray-500">ABOUT</span>
          <span className="text-sm tracking-wide text-gray-500">CONTACT</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-16">
        <h2 className="text-4xl font-light text-gray-800 mb-2">Portfolio</h2>
        <p className="text-gray-500">Clean & Simple</p>
      </div>

      {/* Minimal Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({length: 9}).map((_, i) => (
            <div key={i} className="aspect-square">
              <div className="w-full h-full bg-gray-200 rounded-none flex items-center justify-center">
                <span className="text-gray-400 text-xl">⬜</span>
              </div>
            </div>
          ))}
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