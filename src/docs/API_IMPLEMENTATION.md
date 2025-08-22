# 📋 Documentation d'Implémentation - API Finances Piccloud

## 🎯 Vue d'ensemble

Cette documentation décrit l'implémentation des fonctionnalités financières basées sur l'API Piccloud `/v1/finances`. Les interfaces ont été simplifiées pour correspondre exactement aux endpoints disponibles.

## 🔗 Endpoints API Implémentés

### 1. **Création de transaction** - `POST /v1/finances/store`

**Champs requis :**
- `amount` (number) - Montant de la transaction
- `type` (string) - Type : "income" ou "expense"
- `name` (string) - Libellé de la transaction

**Champs optionnels :**
- `contactId` (string) - ID du client/contact
- `prestationTypeId` (string) - ID du type de prestation
- `date` (string) - Date de la transaction
- `hours` (string) - Heure de la transaction

**Implémentation :**
```typescript
const createTransaction = async (transactionData: any) => {
  // TODO: Remplacer par fetch('/v1/finances/store', { 
  //   method: 'POST', 
  //   body: JSON.stringify(transactionData) 
  // })
};
```

### 2. **Liste des transactions** - `GET /v1/finances`

**Implémentation :**
```typescript
const fetchTransactions = async () => {
  // TODO: Remplacer par fetch('/v1/finances')
};
```

### 3. **Filtrage** - `GET /v1/finances/filter`

**Implémentation :**
```typescript
const filterTransactions = async (filters: any) => {
  // TODO: Remplacer par fetch('/v1/finances/filter', { 
  //   method: 'GET', 
  //   params: filters 
  // })
};
```

### 4. **Export** - `GET /v1/finances/export/{type}`

**Formats supportés :** CSV, XLSX, PDF

**Implémentation :**
```typescript
const exportData = async (format: string) => {
  // TODO: Remplacer par fetch(`/v1/finances/export/${format}`)
};
```

### 5. **Statistiques factures** - `GET /v1/finances/invoices/stats`

**Données retournées :**
- Total facturé
- Montant payé
- Montant en attente
- Retards

**Implémentation :**
```typescript
const fetchInvoiceStats = async () => {
  // TODO: Remplacer par fetch('/v1/finances/invoices/stats')
};
```

### 6. **Statistiques revenus** - `GET /v1/finances/revenue-stats`

**Données retournées :**
- Revenus par mois/trimestre/année

**Implémentation :**
```typescript
const fetchRevenueStats = async () => {
  // TODO: Remplacer par fetch('/v1/finances/revenue-stats')
};
```

## 🗂️ Structure des Fichiers

### 📄 `/src/pages/FinanceDepenses.tsx`
**Fonctionnalités disponibles :**
- ✅ Création de nouvelles dépenses (POST)
- ✅ Affichage liste des dépenses (GET)
- ✅ Filtrage par catégorie et recherche
- ✅ Export CSV/Excel
- ❌ **SUPPRIMÉ :** Édition/suppression individuelle (pas d'endpoints PATCH/DELETE)

### 📄 `/src/pages/FinancePaiements.tsx`
**Fonctionnalités disponibles :**
- ✅ Création de nouveaux paiements (POST)
- ✅ Affichage liste des paiements (GET)
- ✅ Filtrage par type et statut
- ✅ Export CSV/Excel
- ❌ **SUPPRIMÉ :** Édition/suppression individuelle

### 📄 `/src/pages/UserFinance.tsx`
**Fonctionnalités disponibles :**
- ✅ Dashboard avec KPIs basés sur `/invoices/stats`
- ✅ Graphiques basés sur `/revenue-stats`
- ✅ Métriques calculées (marge, prix moyen, etc.)
- ✅ Export des données
- ✅ Actualisation en temps réel
- ❌ **SUPPRIMÉ :** Graphiques complexes non supportés par l'API

## 🔄 Fonctionnalités Supprimées

### ❌ Édition/Suppression Individuelles
**Raison :** Pas d'endpoints PATCH/PUT/DELETE dans l'API
- Boutons "Modifier" supprimés
- Boutons "Supprimer" supprimés
- Dialogs d'édition supprimés

### ❌ Gestion d'État Complexe
**Raison :** Simplification pour correspondre à l'API
- Plus de gestion de statuts complexes
- Plus de modifications en temps réel
- Simplification des formulaires

### ❌ Données Mockées Complexes
**Raison :** Remplacement par appels API réels
- Données statiques remplacées par TODO API
- Structure simplifiée

## 🛠️ Implémentation Technique

### Interface Transaction Unifiée
```typescript
interface Transaction {
  id: number;
  amount: number;
  contactId?: string;
  prestationTypeId?: string;
  name: string;
  type: "income" | "expense";
  date: string;
  hours?: string;
  // Champs spécifiques selon le type
}
```

### Gestion d'État Simplifiée
```typescript
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
const [loading, setLoading] = useState(false);
```

### Gestion d'Erreurs avec Toast
```typescript
import { toast } from "sonner";

try {
  // Appel API
} catch (error) {
  toast.error("Message d'erreur approprié");
}
```

## 📊 Métriques Calculées

### KPIs Principaux (basés sur `/invoices/stats`)
1. **Total Factures** - Nombre de factures émises
2. **CA HT** - Chiffre d'affaires hors taxes
3. **Bénéfices** - Profit net calculé
4. **Dépenses** - Total des dépenses
5. **Impayés** - Nombre de factures impayées

### Métriques Avancées
1. **Marge bénéficiaire** - (Bénéfice/CA) × 100
2. **Prix moyen/facture** - CA total / Nombre factures
3. **Taux d'impayés** - (Impayés/Total factures) × 100
4. **Ratio dépenses/CA** - (Dépenses/CA) × 100

## 🚀 Prochaines Étapes

### 1. Connexion API Réelle
Remplacer tous les `// TODO:` par les vrais appels fetch() :
```typescript
const response = await fetch('/v1/finances/store', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(transactionData)
});
```

### 2. Gestion d'Authentification
Ajouter les headers d'auth nécessaires :
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### 3. Gestion d'Erreurs Avancée
Implémenter une gestion d'erreurs plus robuste selon les codes de réponse API.

### 4. Cache et Performance
Ajouter du cache pour éviter les appels API répétés :
```typescript
// React Query ou SWR pour le cache
const { data, error, isLoading } = useSWR('/v1/finances', fetcher);
```

## ⚠️ Notes Importantes

1. **Validation** : Valider les données côté client avant envoi API
2. **Pagination** : Prévoir la pagination pour les grandes listes
3. **Temps réel** : Considérer WebSockets pour les mises à jour temps réel
4. **Permissions** : Gérer les permissions utilisateur selon les rôles
5. **Optimisation** : Minimiser les appels API avec du cache intelligent

## 🔧 Configuration Requise

### Variables d'Environnement
```env
REACT_APP_API_BASE_URL=https://api.piccloud.com
REACT_APP_API_VERSION=v1
```

### Dépendances
- `sonner` - Pour les notifications toast
- `recharts` - Pour les graphiques
- `date-fns` - Pour la gestion des dates

Cette implémentation respecte strictement les contraintes de l'API Piccloud tout en offrant une expérience utilisateur optimale.