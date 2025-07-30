import { useState, useEffect } from "react";

interface ResponsiveGridConfig {
  xs: number; // < 640px
  sm: number; // >= 640px
  md: number; // >= 768px
  lg: number; // >= 1024px
  xl: number; // >= 1280px
}

const defaultConfig: ResponsiveGridConfig = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 6
};

export function useResponsiveGrid(config: Partial<ResponsiveGridConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  const [columns, setColumns] = useState(finalConfig.lg);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setColumns(finalConfig.xs);
      } else if (width < 768) {
        setColumns(finalConfig.sm);
      } else if (width < 1024) {
        setColumns(finalConfig.md);
      } else if (width < 1280) {
        setColumns(finalConfig.lg);
      } else {
        setColumns(finalConfig.xl);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    
    return () => window.removeEventListener('resize', updateColumns);
  }, [finalConfig]);

  const getGridClasses = () => {
    return `grid-cols-${finalConfig.xs} sm:grid-cols-${finalConfig.sm} md:grid-cols-${finalConfig.md} lg:grid-cols-${finalConfig.lg} xl:grid-cols-${finalConfig.xl}`;
  };

  return {
    columns,
    gridClasses: getGridClasses()
  };
}

// Hook pour les breakpoints fréquents
export function useCommonGrids() {
  return {
    stats: useResponsiveGrid({ xs: 2, sm: 3, md: 3, lg: 6, xl: 6 }),
    cards: useResponsiveGrid({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
    dashboard: useResponsiveGrid({ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 })
  };
}