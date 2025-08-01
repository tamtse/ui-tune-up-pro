import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/StatCard";
import { useCommonGrids } from "@/hooks/use-responsive-grid";
import { 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  FileText,
  Download,
  Filter
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Données simulées basées sur l'API disponible
const revenueData = [
  { month: "Jan", amount: 3200 },
  { month: "Fév", amount: 2800 },
  { month: "Mar", amount: 3500 },
  { month: "Avr", amount: 4200 },
  { month: "Mai", amount: 3800 },
  { month: "Juin", amount: 4500 },
];

const profitData = [
  { month: "Jan", amount: 2400 },
  { month: "Fév", amount: 2100 },
  { month: "Mar", amount: 2800 },
  { month: "Avr", amount: 3400 },
  { month: "Mai", amount: 3000 },
  { month: "Juin", amount: 3600 },
];

const expensesData = [
  { month: "Jan", amount: 800 },
  { month: "Fév", amount: 700 },
  { month: "Mar", amount: 700 },
  { month: "Avr", amount: 800 },
  { month: "Mai", amount: 800 },
  { month: "Juin", amount: 900 },
];

const expensesByType = [
  { name: "Frais généraux", value: 1200, color: "hsl(var(--primary))" },
  { name: "Équipement", value: 800, color: "hsl(var(--secondary))" },
  { name: "Transport", value: 600, color: "hsl(var(--accent))" },
  { name: "Marketing", value: 400, color: "hsl(var(--muted))" },
];

const chartConfig = {
  revenue: {
    label: "Chiffre d'affaires",
    color: "hsl(var(--primary))",
  },
  profit: {
    label: "Bénéfice",
    color: "hsl(var(--secondary))",
  },
  expenses: {
    label: "Dépenses",
    color: "hsl(var(--accent))",
  },
};

export default function UserFinance() {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-06-30");
  const [shootingType, setShootingType] = useState("all");
  
  const { stats } = useCommonGrids();

  const statistiques = [
    {
      title: "Factures",
      value: "16",
      change: "+2 ce mois",
      changeType: "positive" as const,
      icon: <FileText className="w-full h-full" />,
    },
    {
      title: "CA HT",
      value: "2 022 000 FCFA",
      change: "+15%",
      changeType: "positive" as const,
      icon: <Euro className="w-full h-full" />,
    },
    {
      title: "Bénéfices",
      value: "654 000 FCFA",
      change: "+8%", 
      changeType: "positive" as const,
      icon: <TrendingUp className="w-full h-full" />,
    },
    {
      title: "Dépenses",
      value: "1 702 800 FCFA",
      change: "+12%",
      changeType: "negative" as const,
      icon: <TrendingDown className="w-full h-full" />,
    },
    {
      title: "Impayés",
      value: "3",
      change: "À relancer",
      changeType: "negative" as const,
      icon: <FileText className="w-full h-full" />,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Finances</h1>
            <p className="text-muted-foreground">
              Tableau de bord financier pour piloter votre activité photographe
            </p>
          </div>
          
          {/* Navigation des sous-menus */}
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <a href="/finances/depenses">Dépenses</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/finances/paiements">Paiements</a>
            </Button>
          </div>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-4 lg:space-y-0 lg:flex lg:flex-wrap lg:gap-4 lg:items-end">
              <div className="flex flex-col space-y-2 lg:min-w-0">
                <label className="text-sm font-medium">Filtrer par</label>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">2 critères</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:flex-1">
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
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium lg:invisible">Action</label>
                  <Button variant="outline" size="default" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {statistiques.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Chiffre d'affaires */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">Chiffre d'affaires (HT)</CardTitle>
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

          {/* Bénéfices */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">Bénéfices</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={profitData}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      fill="url(#colorProfit)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Dépenses */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">Dépenses (HT)</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={expensesData}>
                    <defs>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      fill="url(#colorExpenses)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Dépenses par type */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">Dépenses par type</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByType}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                    >
                      {expensesByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value: any) => [`${value} FCFA`, "Montant"]}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Métriques calculées */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">Métriques de performance</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-lg sm:text-2xl font-bold text-primary">32%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Marge bénéficiaire</div>
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-lg sm:text-2xl font-bold text-secondary">126 600 FCFA</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Prix moyen/shooting</div>
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-lg sm:text-2xl font-bold text-accent">8</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Projets ce mois</div>
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-lg sm:text-2xl font-bold text-success">24j</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Délai paiement moyen</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}