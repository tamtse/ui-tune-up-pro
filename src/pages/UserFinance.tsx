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
      title: "Nombre de factures",
      value: "16",
      change: "+2 ce mois",
      changeType: "positive" as const,
      icon: <FileText className="w-full h-full" />,
    },
    {
      title: "Chiffre d'affaires HT",
      value: "3370 €",
      change: "+15% vs mois dernier",
      changeType: "positive" as const,
      icon: <Euro className="w-full h-full" />,
    },
    {
      title: "Bénéfice TTC",
      value: "1090 €",
      change: "+8% vs mois dernier", 
      changeType: "positive" as const,
      icon: <TrendingUp className="w-full h-full" />,
    },
    {
      title: "Dépenses TTC",
      value: "2838 €",
      change: "+12% vs mois dernier",
      changeType: "negative" as const,
      icon: <TrendingDown className="w-full h-full" />,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Finances</h1>
            <p className="text-muted-foreground">
              Tableau de bord financier pour piloter votre activité photographe
            </p>
          </div>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Filtrer par</label>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">2 critères</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Date de début</label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-40"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Date de fin</label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-40"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Type de shooting</label>
                <Select value={shootingType} onValueChange={setShootingType}>
                  <SelectTrigger className="w-40">
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
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className={`grid gap-4 ${stats.gridClasses}`}>
          {statistiques.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chiffre d'affaires */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chiffre d'affaires (HT)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bénéfices</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dépenses (HT)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dépenses par type</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
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
                      formatter={(value: any) => [`${value}€`, "Montant"]}
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
          <CardHeader>
            <CardTitle className="text-lg">Métriques de performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">32%</div>
                <div className="text-sm text-muted-foreground">Marge bénéficiaire</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-secondary">211€</div>
                <div className="text-sm text-muted-foreground">Prix moyen/shooting</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-accent">8</div>
                <div className="text-sm text-muted-foreground">Projets ce mois</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-success">24j</div>
                <div className="text-sm text-muted-foreground">Délai paiement moyen</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}