import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/StatCard";
import { useCommonGrids } from "@/hooks/use-responsive-grid";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  FileText,
  Filter,
  Info,
  HelpCircle,
  Download,
  RefreshCw
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

interface FinanceStats {
  totalInvoices: number;
  totalRevenue: number;
  totalProfit: number;
  totalExpenses: number;
  unpaidInvoices: number;
}

interface RevenueData {
  month: string;
  amount: number;
}

const chartConfig = {
  revenue: {
    label: "Chiffre d'affaires",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Dépenses",
    color: "hsl(var(--destructive))",
  },
};

export default function UserFinance() {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");
  const [shootingType, setShootingType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<FinanceStats>({
    totalInvoices: 0,
    totalRevenue: 0,
    totalProfit: 0,
    totalExpenses: 0,
    unpaidInvoices: 0
  });
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  
  const { stats: gridStats } = useCommonGrids();

  // Simulation des appels API
  const fetchInvoiceStats = async () => {
    try {
      // TODO: Remplacer par fetch('/v1/finances/invoices/stats')
      const mockStats = {
        totalInvoices: 16,
        totalRevenue: 2022000,
        totalProfit: 654000,
        totalExpenses: 1368000,
        unpaidInvoices: 3
      };
      setStats(mockStats);
    } catch (error) {
      toast.error("Erreur lors du chargement des statistiques factures");
    }
  };

  const fetchRevenueStats = async () => {
    try {
      // TODO: Remplacer par fetch('/v1/finances/revenue-stats')
      const mockRevenueData = [
        { month: "Jan", amount: 320000 },
        { month: "Fév", amount: 280000 },
        { month: "Mar", amount: 350000 },
        { month: "Avr", amount: 420000 },
        { month: "Mai", amount: 380000 },
        { month: "Juin", amount: 450000 },
      ];
      setRevenueData(mockRevenueData);
    } catch (error) {
      toast.error("Erreur lors du chargement des statistiques de revenus");
    }
  };

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchInvoiceStats(),
        fetchRevenueStats()
      ]);
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (format: string) => {
    try {
      // TODO: Remplacer par fetch(`/v1/finances/export/${format}`)
      toast.success(`Export ${format.toUpperCase()} en cours...`);
    } catch (error) {
      toast.error("Erreur lors de l'export");
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, [dateFrom, dateTo, shootingType]);

  const statistiques = [
    {
      title: "Factures",
      value: stats.totalInvoices.toString(),
      change: "+2 ce mois",
      changeType: "positive" as const,
      icon: <FileText className="w-full h-full" />,
    },
    {
      title: "CA HT",
      value: `${stats.totalRevenue.toLocaleString()} FCFA`,
      change: "+15%",
      changeType: "positive" as const,
      icon: <Euro className="w-full h-full" />,
    },
    {
      title: "Bénéfices",
      value: `${stats.totalProfit.toLocaleString()} FCFA`,
      change: "+8%", 
      changeType: "positive" as const,
      icon: <TrendingUp className="w-full h-full" />,
    },
    {
      title: "Dépenses",
      value: `${stats.totalExpenses.toLocaleString()} FCFA`,
      change: "+12%",
      changeType: "negative" as const,
      icon: <TrendingDown className="w-full h-full" />,
    },
    {
      title: "Impayés",
      value: stats.unpaidInvoices.toString(),
      change: "À relancer",
      changeType: "negative" as const,
      icon: <FileText className="w-full h-full" />,
    },
  ];

  return (
    <AdminLayout>
      <TooltipProvider>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Finances</h1>
              <p className="text-muted-foreground">
                Tableau de bord financier basé sur l'API Piccloud
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Données en temps réel via l'API /v1/finances</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportData('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportData('xlsx')}>
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" onClick={fetchAllStats} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" asChild>
                  <a href="/finances/depenses">Dépenses</a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gérer et suivre toutes vos dépenses professionnelles</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" asChild>
                  <a href="/finances/paiements">Paiements</a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Suivre les paiements reçus et les encaissements</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-4 lg:space-y-0 lg:flex lg:flex-wrap lg:gap-4 lg:items-end">
              <div className="flex flex-col space-y-2 lg:min-w-0">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Filtrer par</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filtrez vos données par période et type de shooting</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">3 critères</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:flex-1">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Date début</label>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Date fin</label>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Type shooting</label>
                  <Select value={shootingType} onValueChange={setShootingType}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tout</SelectItem>
                      <SelectItem value="wedding">Mariage</SelectItem>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="event">Événement</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs basés sur les endpoints API */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {statistiques.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Graphiques basés sur /v1/finances/revenue-stats */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">Évolution des revenus</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Données issues de /v1/finances/revenue-stats</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">Comparaison Revenus vs Dépenses</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Analyse comparative pour identifier les périodes rentables</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="amount"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Métriques calculées basées sur les stats API */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">Métriques de performance calculées</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Calculs basés sur les données de /v1/finances/invoices/stats</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <Tooltip>
                <TooltipTrigger className="text-center space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl font-bold text-primary">
                    {stats.totalRevenue > 0 ? Math.round((stats.totalProfit / stats.totalRevenue) * 100) : 0}%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Marge bénéficiaire</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pourcentage de profit par rapport au CA (Bénéfice/CA x 100)</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="text-center space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl font-bold text-secondary">
                    {stats.totalInvoices > 0 ? Math.round(stats.totalRevenue / stats.totalInvoices).toLocaleString() : 0} FCFA
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Prix moyen/facture</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Montant moyen par facture émise</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="text-center space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl font-bold text-accent">
                    {stats.totalInvoices > 0 ? Math.round((stats.unpaidInvoices / stats.totalInvoices) * 100) : 0}%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Taux d'impayés</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pourcentage de factures impayées</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="text-center space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl font-bold text-muted-foreground">
                    {stats.totalRevenue > 0 ? Math.round((stats.totalExpenses / stats.totalRevenue) * 100) : 0}%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Ratio dépenses/CA</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pourcentage des dépenses par rapport au chiffre d'affaires</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2">
                <a href="/finances/depenses">
                  <TrendingDown className="h-6 w-6" />
                  <span className="text-sm">Nouvelle dépense</span>
                </a>
              </Button>
              <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2">
                <a href="/finances/paiements">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">Nouveau paiement</span>
                </a>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => exportData('pdf')}
                className="h-auto p-4 flex-col space-y-2"
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">Export PDF</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={fetchAllStats}
                disabled={loading}
                className="h-auto p-4 flex-col space-y-2"
              >
                <RefreshCw className={`h-6 w-6 ${loading ? 'animate-spin' : ''}`} />
                <span className="text-sm">Actualiser</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </TooltipProvider>
    </AdminLayout>
  );
}