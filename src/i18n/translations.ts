export interface Translations {
  // Header
  settings: string;
  signOut: string;
  
  // Auth
  welcomeBack: string;
  createAccount: string;
  signInDescription: string;
  signUpDescription: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  signIn: string;
  signUp: string;
  signingIn: string;
  creatingAccount: string;
  noAccount: string;
  haveAccount: string;
  passwordsDoNotMatch: string;
  passwordTooShort: string;
  
  // Summary
  summaryReport: string;
  newStay: string;
  monthlyTotals: string;
  trimesterTotals: string;
  yearlyTotal: string;
  totalTax: string;
  totalNights: string;
  totalGuests: string;
  nights: string;
  guests: string;
  
  // Monthly View
  backToSummary: string;
  stays: string;
  guest: string;
  entryDate: string;
  actions: string;
  tax: string;
  confirmDelete: string;
  deleteConfirmation: string;
  cancel: string;
  delete: string;
  editStay: string;
  deleteStay: string;
  exit: string;
  continuesNextMonth: string;
  multiMonthStayContinues: string;
  minors: string;
  
  // Forms
  newNightlyStay: string;
  numberOfNights: string;
  exitDate: string;
  firstName: string;
  lastName: string;
  numberOfGuests: string;
  numberOfMinors: string;
  dailyTax: string;
  preStayNotes: string;
  postStayNotes: string;
  addStay: string;
  updateStay: string;
  enterNotesBeforeStay: string;
  enterNotesAfterStay: string;
  crossMonthStay: string;
  daysIn: string;
  and: string;
  multiMonthStayOriginal: string;
  partOf: string;
  
  // Config
  configuration: string;
  appName: string;
  logoUrl: string;
  year: string;
  month: string;
  updateConfiguration: string;
  language: string;
  
  // Months
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
  
  // Loading
  loading: string;
  
  // Footer
  teamInovaSolution: string;
}

export const translations: Record<string, Translations> = {
  it: {
    // Header
    settings: 'Impostazioni',
    signOut: 'Esci',
    
    // Auth
    welcomeBack: 'Bentornato',
    createAccount: 'Crea Account',
    signInDescription: 'Accedi per utilizzare il calcolatore della tassa di soggiorno',
    signUpDescription: 'Registrati per iniziare a gestire le tasse di soggiorno',
    emailAddress: 'Indirizzo Email',
    password: 'Password',
    confirmPassword: 'Conferma Password',
    signIn: 'Accedi',
    signUp: 'Registrati',
    signingIn: 'Accesso in corso...',
    creatingAccount: 'Creazione account...',
    noAccount: 'Non hai un account? Registrati',
    haveAccount: 'Hai già un account? Accedi',
    passwordsDoNotMatch: 'Le password non corrispondono',
    passwordTooShort: 'La password deve essere di almeno 6 caratteri',
    
    // Summary
    summaryReport: 'Rapporto Riepilogativo',
    newStay: 'Nuovo Soggiorno',
    monthlyTotals: 'Totali Mensili',
    trimesterTotals: 'Totali Trimestrali',
    yearlyTotal: 'Totale Annuale',
    totalTax: 'Tassa Totale',
    totalNights: 'Notti Totali',
    totalGuests: 'Ospiti Totali',
    nights: 'notti',
    guests: 'ospiti',
    
    // Monthly View
    backToSummary: 'Torna al Riepilogo',
    stays: 'Soggiorni',
    guest: 'Ospite',
    entryDate: 'Data Arrivo',
    actions: 'Azioni',
    tax: 'Tassa',
    confirmDelete: 'Conferma Eliminazione',
    deleteConfirmation: 'Sei sicuro di voler eliminare il soggiorno per',
    cancel: 'Annulla',
    delete: 'Elimina',
    editStay: 'Modifica Soggiorno',
    deleteStay: 'Elimina Soggiorno',
    exit: 'Partenza',
    continuesNextMonth: '(Continua il mese prossimo)',
    multiMonthStayContinues: 'Soggiorno multi-mese continua nel mese successivo',
    minors: 'minori',
    
    // Forms
    newNightlyStay: 'Nuovo Soggiorno Notturno',
    numberOfNights: 'Numero di Notti',
    exitDate: 'Data Partenza',
    firstName: 'Nome',
    lastName: 'Cognome',
    numberOfGuests: 'Numero di Ospiti',
    numberOfMinors: 'Numero di Minori',
    dailyTax: 'Tassa Giornaliera (€)',
    preStayNotes: 'Note Pre-Soggiorno',
    postStayNotes: 'Note Post-Soggiorno',
    addStay: 'Aggiungi Soggiorno',
    updateStay: 'Aggiorna Soggiorno',
    enterNotesBeforeStay: 'Inserisci note prima del soggiorno...',
    enterNotesAfterStay: 'Inserisci note dopo il soggiorno...',
    crossMonthStay: 'Soggiorno Multi-Mese',
    daysIn: 'giorni in',
    and: 'e',
    multiMonthStayOriginal: 'Soggiorno Multi-Mese - Originale',
    partOf: 'Parte',
    
    // Config
    configuration: 'Configurazione',
    appName: 'Nome App',
    logoUrl: 'URL Logo',
    year: 'Anno',
    month: 'Mese',
    updateConfiguration: 'Aggiorna Configurazione',
    language: 'Lingua',
    
    // Months
    months: {
      january: 'Gennaio',
      february: 'Febbraio',
      march: 'Marzo',
      april: 'Aprile',
      may: 'Maggio',
      june: 'Giugno',
      july: 'Luglio',
      august: 'Agosto',
      september: 'Settembre',
      october: 'Ottobre',
      november: 'Novembre',
      december: 'Dicembre',
    },
    
    // Loading
    loading: 'Caricamento...',
    
    // Footer
    teamInovaSolution: 'Una Soluzione TeamInova',
  },
  
  en: {
    // Header
    settings: 'Settings',
    signOut: 'Sign Out',
    
    // Auth
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    signInDescription: 'Sign in to access your stay tax calculator',
    signUpDescription: 'Sign up to start managing your stay taxes',
    emailAddress: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing In...',
    creatingAccount: 'Creating Account...',
    noAccount: "Don't have an account? Sign up",
    haveAccount: 'Already have an account? Sign in',
    passwordsDoNotMatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters long',
    
    // Summary
    summaryReport: 'Summary Report',
    newStay: 'New Stay',
    monthlyTotals: 'Monthly Totals',
    trimesterTotals: 'Trimester Totals',
    yearlyTotal: 'Yearly Total',
    totalTax: 'Total Tax',
    totalNights: 'Total Nights',
    totalGuests: 'Total Guests',
    nights: 'nights',
    guests: 'guests',
    
    // Monthly View
    backToSummary: 'Back to Summary',
    stays: 'Stays',
    guest: 'Guest',
    entryDate: 'Entry Date',
    actions: 'Actions',
    tax: 'Tax',
    confirmDelete: 'Confirm Delete',
    deleteConfirmation: 'Are you sure you want to delete the stay for',
    cancel: 'Cancel',
    delete: 'Delete',
    editStay: 'Edit Stay',
    deleteStay: 'Delete Stay',
    exit: 'Exit',
    continuesNextMonth: '(Continues next month)',
    multiMonthStayContinues: 'Multi-month stay continues into next month',
    minors: 'minors',
    
    // Forms
    newNightlyStay: 'New Nightly Stay',
    numberOfNights: 'Number of Nights',
    exitDate: 'Exit Date',
    firstName: 'First Name',
    lastName: 'Last Name',
    numberOfGuests: 'Number of Guests',
    numberOfMinors: 'Number of Minors',
    dailyTax: 'Daily Tax (€)',
    preStayNotes: 'Pre-Stay Notes',
    postStayNotes: 'Post-Stay Notes',
    addStay: 'Add Stay',
    updateStay: 'Update Stay',
    enterNotesBeforeStay: 'Enter any notes before the stay...',
    enterNotesAfterStay: 'Enter any notes after the stay...',
    crossMonthStay: 'Cross Month Stay',
    daysIn: 'days in',
    and: 'and',
    multiMonthStayOriginal: 'Multi-Month Stay - Original',
    partOf: 'Part',
    
    // Config
    configuration: 'Configuration',
    appName: 'App Name',
    logoUrl: 'Logo URL',
    year: 'Year',
    month: 'Month',
    updateConfiguration: 'Update Configuration',
    language: 'Language',
    
    // Months
    months: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
    },
    
    // Loading
    loading: 'Loading...',
    
    // Footer
    teamInovaSolution: 'A TeamInova Solution',
  },
};