export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: PricingTier;
}

export interface PricingTier {
  monthly: number;
  annual: number;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  results: ProjectResults;
}

export interface ProjectResults {
  metrics: {
    label: string;
    value: string;
    change: number;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactInfo {
  company: {
    name: string;
    address: {
      street: string;
      city: string;
      country: string;
      postalCode: string;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  schedule: {
    weekdays: string;
    weekend: string;
  };
}