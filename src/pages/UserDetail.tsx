import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share, MoreHorizontal, Mail, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const activityData = {
  clients: { value: 450, change: "+10 la semaine précédente", trend: "up" },
  prestations: { value: 8, change: "+10 la semaine précédente", trend: "up" },
  devis: { value: 100, change: "+10 la semaine précédente", trend: "up" },
  factures: { value: 120, change: "+10 la semaine précédente", trend: "down" },
};

export default function UserDetail() {
  const { id } = useParams();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/users">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <div className="text-primary text-lg font-bold">A</div>
              </div>
              <h1 className="text-2xl font-bold">Information utilisateur</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/avatars/kristin.jpg" alt="Kristin Watson" />
                    <AvatarFallback className="text-lg">KW</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-success rounded-full border-2 border-background"></div>
                </div>
                
                <h2 className="text-xl font-bold mb-1">Kristin Watson</h2>
                <p className="text-muted-foreground mb-2">kristinwatson@mail.com</p>
                <div className="flex items-center justify-center text-muted-foreground mb-4">
                  <span className="text-sm">📍 Yaoundé - Douala</span>
                </div>

                <div className="flex justify-center space-x-2 mb-6">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    Plus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="informations" className="space-y-4">
              <TabsList>
                <TabsTrigger value="informations">Informations</TabsTrigger>
                <TabsTrigger value="activite">Activité</TabsTrigger>
                <TabsTrigger value="abonnement">Abonnement</TabsTrigger>
              </TabsList>

              <TabsContent value="informations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Nom</label>
                        <p className="font-medium">Company Studio</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Entreprise</label>
                        <p className="font-medium">✖️ Xing</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <p className="font-medium">kristinwatson@mail.com</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Numéro</label>
                        <p className="font-medium">(303) 555-0105</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Autres informations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Pays</label>
                        <p className="font-medium">Cameroun</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Ville</label>
                        <p className="font-medium">Douala</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activite" className="space-y-4">
                {/* Activity Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(activityData).map(([key, data]) => (
                    <Card key={key}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground capitalize">
                              Nombre de {key}
                            </p>
                            <p className="text-2xl font-bold mt-2">{data.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {data.change}
                            </p>
                          </div>
                          <div className="text-right">
                            {data.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-success" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Monthly Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Prestations mensuelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'].map((month, index) => (
                        <div key={month} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-full rounded-t-sm ${index === 7 ? 'bg-primary' : 'bg-primary/30'}`}
                            style={{ 
                              height: `${Math.random() * 100 + 50}px`,
                              minHeight: '20px'
                            }}
                          ></div>
                          <span className="text-xs text-muted-foreground mt-2">{month}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="abonnement" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations d'abonnement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Plan actuel</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-success/10 text-success">Premium</Badge>
                          <span className="text-sm text-muted-foreground">- Facturation mensuelle</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Date d'expiration</label>
                        <p className="font-medium">15 Décembre 2024</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Montant mensuel</label>
                        <p className="font-medium">29 900 F CFA</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}