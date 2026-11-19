import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#08B99A",
      light: "#21D6B5",
      dark: "#06947A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#071D3A",
      light: "#0B2B50",
      dark: "#051528",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily:
      "var(--font-inter), system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 2px rgba(7,29,58,0.06)",
          borderRadius: "14px !important",
          "&:before": { display: "none" },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          padding: "0 20px",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableRipple: false },
    },
  },
});
