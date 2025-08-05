import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, Image as ImageIcon, Grid3X3 } from "lucide-react";
import { toast } from "sonner";

interface MediaSectionProps {
  gallery: string[];
  onGalleryChange: (images: string[]) => void;
}

export function MediaSection({ gallery, onGalleryChange }: MediaSectionProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const remainingSlots = 30 - gallery.length;
    if (files.length > remainingSlots) {
      toast.error(`Vous ne pouvez ajouter que ${remainingSlots} images supplémentaires`);
      return;
    }

    setIsUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages.push(result);
          
          if (newImages.length === files.length) {
            onGalleryChange([...gallery, ...newImages]);
            setIsUploading(false);
            toast.success(`${newImages.length} image(s) ajoutée(s)`);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    onGalleryChange(newGallery);
    toast.success("Image supprimée");
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newGallery = [...gallery];
    const [movedItem] = newGallery.splice(fromIndex, 1);
    newGallery.splice(toIndex, 0, movedItem);
    onGalleryChange(newGallery);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Galerie d'images
            <Badge variant="secondary">{gallery.length}/30</Badge>
          </CardTitle>
          <CardDescription>
            Ajoutez jusqu'à 30 images pour votre galerie. Glissez-déposez pour réorganiser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Zone d'upload */}
          <div className="mb-6">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading || gallery.length >= 30}
              />
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                gallery.length >= 30 
                  ? 'border-muted-foreground/25 bg-muted/50' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/25'
              }`}>
                <Upload className={`mx-auto h-8 w-8 mb-3 ${
                  gallery.length >= 30 ? 'text-muted-foreground/50' : 'text-muted-foreground'
                }`} />
                {isUploading ? (
                  <p className="text-sm text-muted-foreground">Upload en cours...</p>
                ) : gallery.length >= 30 ? (
                  <p className="text-sm text-muted-foreground">Limite de 30 images atteinte</p>
                ) : (
                  <>
                    <p className="text-sm font-medium mb-1">
                      Cliquez pour ajouter des images
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WebP jusqu'à 10MB chacune
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Grille d'images */}
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg border"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', index.toString());
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    if (fromIndex !== index) {
                      moveImage(fromIndex, index);
                    }
                  }}
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  {/* Overlay avec actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 w-7 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {/* Numéro d'ordre */}
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge variant="secondary" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Grid3X3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucune image</h3>
              <p className="text-sm text-muted-foreground">
                Commencez par ajouter quelques images à votre galerie
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}