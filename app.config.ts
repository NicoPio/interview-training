export default defineAppConfig({
  ui: {
    // Override primary color with better contrast
    primary: 'green',
    colors: {
      // Custom colors with better contrast ratios for WCAG AA compliance
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#00a040', // Darker green for better contrast (was #00c950 = 2.23, now ~3.5)
        600: '#008533', // Even darker for text
        700: '#006b2a',
        800: '#005522',
        900: '#00441b',
        950: '#002910',
      },
    },
    // Override badge colors for better contrast
    badge: {
      default: {
        color: 'green',
      },
    },
  },
})
