import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ContentSectionProps {
  siteName: string;
  description: string;
  biography: string;
  logo: string | null;
  coverImage: string | null;
          contact: {
            email: string;
            telephone: string;
            adresse: string;
          };
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    website: string;
  };
  onFieldChange: (field: string, value: any) => void;
  onNestedFieldChange: (parent: string, field: string, value: string) => void;
}

export function ContentSection({
  siteName,
  description,
  biography,
  logo,
  coverImage,
  contact,
  socialLinks,
  onFieldChange,
  onNestedFieldChange
}: ContentSectionProps) {
  const handleFileUpload = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFieldChange(field, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Informations générales */}
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>
            Les informations de base de votre site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">Nom du site</Label>
            <Input
              id="siteName"
              value={siteName}
              onChange={(e) => onFieldChange('nom', e.target.value)}
              placeholder="Ex: Studio Photo Lumière"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder="Une description courte de votre activité"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="biography">Biographie / À propos</Label>
            <Textarea
              id="biography"
              value={biography}
              onChange={(e) => onFieldChange('biographie', e.target.value)}
              placeholder="Parlez de vous, votre parcours, votre passion..."
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Images principales</CardTitle>
          <CardDescription>
            Logo et image de couverture de votre site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo */}
          <div>
            <Label>Logo</Label>
            <div className="mt-2">
              {logo ? (
                <div className="relative inline-block">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-24 h-24 object-contain border rounded"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => onFieldChange('logo', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload('logo')}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Cliquez pour ajouter un logo
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
          
          {/* Image de couverture */}
          <div>
            <Label>Image de couverture</Label>
            <div className="mt-2">
              {coverImage ? (
                <div className="relative inline-block">
                  <img
                    src={coverImage}
                    alt="Couverture"
                    className="w-full max-w-sm h-32 object-cover border rounded"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => onFieldChange('imageCouverture', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload('imageCouverture')}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Cliquez pour ajouter une image de couverture
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de contact</CardTitle>
          <CardDescription>
            Comment vos visiteurs peuvent vous contacter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={contact.email}
              onChange={(e) => onNestedFieldChange('contact', 'email', e.target.value)}
              placeholder="contact@monsite.com"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={contact.telephone}
              onChange={(e) => onNestedFieldChange('contact', 'telephone', e.target.value)}
              placeholder="+33 1 23 45 67 89"
            />
          </div>
          
          <div>
            <Label htmlFor="address">Adresse</Label>
            <Textarea
              id="address"
              value={contact.adresse}
              onChange={(e) => onNestedFieldChange('contact', 'adresse', e.target.value)}
              placeholder="123 Rue de la République&#10;75001 Paris&#10;France"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Réseaux sociaux */}
      <Card>
        <CardHeader>
          <CardTitle>Réseaux sociaux</CardTitle>
          <CardDescription>
            Liens vers vos profils sociaux
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={socialLinks.facebook}
              onChange={(e) => onNestedFieldChange('reseauxSociaux', 'facebook', e.target.value)}
              placeholder="https://facebook.com/monprofil"
            />
          </div>
          
          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={socialLinks.instagram}
              onChange={(e) => onNestedFieldChange('reseauxSociaux', 'instagram', e.target.value)}
              placeholder="https://instagram.com/monprofil"
            />
          </div>
          
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={socialLinks.linkedin}
              onChange={(e) => onNestedFieldChange('reseauxSociaux', 'linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/monprofil"
            />
          </div>
          
          <div>
            <Label htmlFor="website">Site web</Label>
            <Input
              id="website"
              value={socialLinks.website}
              onChange={(e) => onNestedFieldChange('reseauxSociaux', 'website', e.target.value)}
              placeholder="https://monsite.com"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}