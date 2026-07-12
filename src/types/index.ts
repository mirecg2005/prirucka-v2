export type Language = "sk" | "en";

export interface TranslatedString {
  sk: string;
  en: string;
}

export interface Section {
  id: string;
  title: TranslatedString;
  icon: string; // lucide icon name
  color: string;
  content: SectionBlock[];
}

export interface SectionBlock {
  type: "text" | "warning" | "danger" | "info" | "list" | "steps";
  title?: TranslatedString;
  body: TranslatedString;
  items?: TranslatedString[]; // pre list alebo steps
}

export interface LawRule {
  id: string;
  title: TranslatedString;
  keywords: TranslatedString;
  reference: string;
  fine: TranslatedString;
  content: TranslatedString;
}

export interface Contact {
  id: string;
  name: TranslatedString;
  role: TranslatedString;
  phones: Phone[];
  emails?: Email[];
  priority: number;
}

export interface Phone {
  number: string;
  label: TranslatedString;
  type: "primary" | "international" | "backup";
}

export interface Email {
  address: string;
  label: TranslatedString;
}
