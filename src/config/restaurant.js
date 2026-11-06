export const defaultRestaurant = {
  id: "nami-luxury",
  slug: "nami",
  name: "NAMI",
  categoryTagline: "CONTEMPORARY GASTRONOMY",
  headline: "NAMI, CONTEMPORARY GASTRONOMY",
  description:
    "We draw inspiration from the diverse richness of coastal waters and native harvest, creating an authentic culinary journey of refined artistry.",
  
  hero: {
    badge: "MICHELIN GUIDE SELECTION 2026",
    primaryCtaText: "RESERVE",
    secondaryCtaText: "EXPLORE MENU",
    image: "/images/hero-canvas-master-v3.jpg",
    alt: "Artisanal charred octopus with spiced puree, toasted corn and microgreens on dark plate",
  },

  theme: {
    obsidian: "#111110",
    charcoal: "#24221F",
    ivory: "#EAE3D7",
    gold: "#B99A65",
    taupe: "#776B5D",
    fontHeading: "Cormorant Garamond, serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
  },

  contact: {
    phone: "+1 (555) 382-9104",
    displayPhone: "+1 (555) 382-9104",
    whatsappNumber: "15553829104",
    address: "428 Grand Avenue, Coastal District, CA 90291",
    googleMapsUrl: "https://maps.google.com",
    city: "Coastal District, CA",
  },

  hours: {
    schedule: "Tue - Sat: 17:30 - 23:30 | Sun: 17:00 - 22:00",
    kitchen: "17:30 – 22:30",
    bar: "17:30 – 00:00",
  },

  navLinks: [
    { label: "ABOUT", href: "#story" },
    { label: "CREATIONS", href: "#creations" },
    { label: "GALLERY", href: "#gallery" },
    { label: "QR MENU", href: "/menu" },
  ],

  story: {
    kicker: "01 / PHILOSOPHY & ORIGIN",
    heading: "ROOTED IN COASTAL HARVEST, REFINED BY ARTISANAL FIRE.",
    paragraphs: [
      "Every evening at Nami begins with a quiet dedication to the sea. We collaborate with generational divers and regional artisanal vessels, selecting only what is vibrant, wild, and uncompromisingly pristine.",
      "Our hearth is fueled exclusively by binchotan charcoal and seasoned fruitwoods. Through radiant heat reaching 1,000°C and delicate aromatic smoke, we distill the unadorned soul of each ingredient without distraction."
    ],
    quote: "“We do not seek to reinvent the ocean. We listen to its rhythms, and we translate its vitality to the flame.”",
    author: "MARCO VALERIO — CULINARY DIRECTOR",
    image: "/images/story-chef.jpg",
    imageAlt: "Executive chef delicately plating gourmet seafood with precision tweezers under focused spotlight",
    pillars: [
      {
        roman: "I",
        title: "DAILY DOCK CATCH",
        text: "Directly sourced from small-scale coastal divers within 60 nautical miles."
      },
      {
        roman: "II",
        title: "BINCHOTAN HEARTH",
        text: "White oak charcoal generating pure, intense infrared sear with zero acrid smoke."
      },
      {
        roman: "III",
        title: "ANCESTRAL ALCHEMY",
        text: "Barrel-aged coastal vinegars, wild koji fermentation, and sun-evaporated sea flakes."
      }
    ]
  },

  signatureDishes: [
    {
      id: "dish-01",
      number: "01",
      badge: "CHEF'S RESERVE",
      name: "PULPO AL CARBÓN",
      subtitle: "CHARRED PACIFIC OCTOPUS",
      description:
        "Spanish octopus gently braised in kelp dashi, then seared over binchotan embers. Served with yellow chili emulsion, toasted heirloom corn, and micro sea herbs.",
      price: 38,
      currency: "USD",
      image: "/images/hero-canvas.jpg",
      imageAlt: "Charred octopus with chili emulsion and toasted corn",
      tags: ["Wood-Fired", "Gluten-Free"]
    },
    {
      id: "dish-02",
      number: "02",
      badge: "ANCESTRAL HERITAGE",
      name: "CAMARÓN REAL AL CARBÓN",
      subtitle: "WOOD-ROASTED JUMBO PRAWN",
      description:
        "Wild colossal tiger prawn brushed with 48-hour house mole negro reduction, accompanied by wood-charred Meyer lemon and whipped avocado crema.",
      price: 44,
      currency: "USD",
      image: "/images/hero-dish.jpg",
      imageAlt: "Grilled colossal prawn with charred lemon half and mole sauce",
      tags: ["Mole Negro", "Signature Dish"]
    },
    {
      id: "dish-03",
      number: "03",
      badge: "SEASONAL HARVEST",
      name: "VIEIRAS CON AZAFRÁN",
      subtitle: "PAN-SEARED DIVER SCALLOPS",
      description:
        "Hand-harvested jumbo sea scallops seared to golden caramelization, paired with saffron beurre blanc, crispy shallot crumble, and coarse flaked sea salt.",
      price: 42,
      currency: "USD",
      image: "/images/dish-scallops.jpg",
      imageAlt: "Golden pan-seared sea scallops with saffron emulsion and herb drops",
      tags: ["Hand-Diver", "Saffron Reduction"]
    }
  ],

  // Standalone QR/NFC Digital Menu Categories (Clean English Michelin Dining)
  menuCategories: [
    {
      id: "raw-bar",
      name: "RAW BAR & STARTERS",
      subtitle: "Oceanic harvests, cured crudos & delicate starters",
      items: [
        {
          id: "crudo-01",
          name: "PACIFIC YELLOWTAIL CRUDO",
          subtitle: "HAMACHI CON PONZU AHUMADO",
          description: "Thinly sliced Pacific yellowtail, white shoyu ponzu, smoked sea salt, serrano chili drops, and charred Hass avocado puree.",
          price: 28,
          currency: "USD",
          image: "/images/dish-carpaccio.jpg",
          imageAlt: "Thinly sliced yellowtail crudo with micro herbs and citrus ponzu drops",
          isChefSpecial: true,
          isVegetarian: false,
          isGlutenFree: true,
          available: true
        },
        {
          id: "crudo-02",
          name: "SMOKED HEIRLOOM BURRATA",
          subtitle: "BURRATA CON TOMATES TLAXCALA",
          description: "Artisanal burrata smoked over mesquite, heirloom tomatoes macerated in aged vinegar, toasted pepita pesto, and grilled sourdough.",
          price: 24,
          currency: "USD",
          image: "/images/dish-burrata.jpg",
          imageAlt: "Creamy smoked burrata surrounded by vibrant heirloom tomatoes and herbal oil",
          isChefSpecial: false,
          isVegetarian: true,
          isGlutenFree: false,
          available: true
        },
        {
          id: "crudo-03",
          name: "BLUEFIN TUNA TARTARE",
          subtitle: "TÁRTARO DE ATÚN ALETA AZUL",
          description: "Hand-cut line-caught bluefin tuna, toasted sesame oil, preserved Meyer lemon, crispy nori chips, and wild caper dust.",
          price: 32,
          currency: "USD",
          image: "/images/dish-tuna-tartare.jpg",
          imageAlt: "Hand-cut bluefin tuna tartare with sesame oil and nori crisps",
          isChefSpecial: true,
          isVegetarian: false,
          isGlutenFree: true,
          available: true
        },
        {
          id: "crudo-04",
          name: "DIVER SCALLOP BLACK AGUACHILE",
          subtitle: "AGUACHILE NEGRO DE CALLO",
          description: "Day-boat sea scallops immersed in ash-roasted habanero aguachile, Persian cucumber ribbons, and pickled shallots.",
          price: 29,
          currency: "USD",
          image: "/images/dish-aguachile.jpg",
          imageAlt: "Day-boat scallops in black aguachile with cucumber ribbons",
          isChefSpecial: false,
          isVegetarian: false,
          isGlutenFree: true,
          available: true
        }
      ]
    },
    {
      id: "hearth-mains",
      name: "BINCHOTAN HEARTH & MAINS",
      subtitle: "Ancestral charcoal hearth & wood-fired seafood",
      items: [
        {
          id: "fuego-01",
          name: "CHARRED PACIFIC OCTOPUS",
          subtitle: "PULPO AL CARBÓN",
          description: "Spanish octopus gently braised in kelp dashi, then seared over binchotan embers. Served with yellow chili emulsion, toasted heirloom corn, and micro sea herbs.",
          price: 38,
          currency: "USD",
          image: "/images/hero-canvas.jpg",
          imageAlt: "Charred octopus with chili emulsion and toasted corn",
          isChefSpecial: true,
          isVegetarian: false,
          isGlutenFree: true,
          available: true
        },
        {
          id: "fuego-02",
          name: "WOOD-ROASTED JUMBO PRAWN",
          subtitle: "CAMARÓN REAL AL CARBÓN",
          description: "Wild colossal tiger prawn brushed with 48-hour house mole negro reduction, accompanied by wood-charred Meyer lemon and whipped avocado crema.",
          price: 44,
          currency: "USD",
          image: "/images/hero-dish.jpg",
          imageAlt: "Grilled colossal prawn with charred lemon half and mole sauce",
          isChefSpecial: true,
          isVegetarian: false,
          isGlutenFree: false,
          available: true
        },
        {
          id: "fuego-03",
          name: "PAN-SEARED DIVER SCALLOPS",
          subtitle: "VIEIRAS CON AZAFRÁN",
          description: "Hand-harvested jumbo sea scallops seared to golden caramelization, paired with saffron beurre blanc, crispy shallot crumble, and coarse flaked sea salt.",
          price: 42,
          currency: "USD",
          image: "/images/dish-scallops.jpg",
          imageAlt: "Golden pan-seared sea scallops with saffron emulsion and herb drops",
          isChefSpecial: false,
          isVegetarian: false,
          isGlutenFree: true,
          available: true
        },
        {
          id: "fuego-04",
          name: "MIYAZAKI A5 WAGYU SIRLOIN",
          subtitle: "WAGYU A5 CON MOLE BLANCO",
          description: "Charcoal-seared Miyazaki A5 Wagyu served over pine nut mole blanco, fermented ramps, and aged tamari reduction glaze.",
          price: 95,
          currency: "USD",
          image: "/images/dish-wagyu.jpg",
          imageAlt: "Charcoal-seared Miyazaki A5 Wagyu with mole blanco",
          isChefSpecial: true,
          isVegetarian: false,
          isGlutenFree: true,
          available: false // Sold Out tonight
        },
        {
          id: "fuego-05",
          name: "WOOD-FIRED LOBSTER BOMBA RICE",
          subtitle: "ARROZ MELOSO DE LANGOSTA",
          description: "Bomba rice slowly simmered in rich crustacean broth over fruitwood embers, tender Maine lobster medallion, and saffron aioli.",
          price: 48,
          currency: "USD",
          image: "/images/dish-lobster-rice.jpg",
          imageAlt: "Wood-fired embers lobster rice with Maine lobster medallion",
          isChefSpecial: false,
          isVegetarian: false,
          isGlutenFree: true,
          available: true
        }
      ]
    },
    {
      id: "harvest-sides",
      name: "HARVEST & SIDES",
      subtitle: "Seasonal organic harvest & wood-charred accompaniments",
      items: [
        {
          id: "side-01",
          name: "CHARRED HEIRLOOM CAULIFLOWER",
          subtitle: "COLIFLOR TATEMADA",
          description: "Wood-fired whole cauliflower head, spiced tahini emulsion, toasted pomegranate seeds, and fresh cilantro oil.",
          price: 18,
          currency: "USD",
          image: "/images/dish-cauliflower.jpg",
          imageAlt: "Wood-fired whole charred cauliflower with tahini emulsion",
          isChefSpecial: false,
          isVegetarian: true,
          isGlutenFree: true,
          available: true
        },
        {
          id: "side-02",
          name: "BLISTERED PADRÓN PEPPERS",
          subtitle: "PIMIENTOS DE PADRÓN A LA BRASA",
          description: "Flash-blistered over white oak coals, finished with Maldon sea salt flakes and cold-pressed extra virgin olive oil.",
          price: 16,
          currency: "USD",
          image: "/images/dish-padron.jpg",
          imageAlt: "Blistered green Padron peppers with sea salt flakes",
          isChefSpecial: false,
          isVegetarian: true,
          isGlutenFree: true,
          available: true
        },
        {
          id: "side-03",
          name: "DUCK-FAT CONFIT TRUFFLE POTATOES",
          subtitle: "PAPAS CONFITADAS CON TRUFA",
          description: "Crispy skin baby Yukon potatoes confited with duck fat, shaved black summer truffle, and chive dust.",
          price: 21,
          currency: "USD",
          image: "/images/dish-truffle-potatoes.jpg",
          imageAlt: "Confit baby potatoes with shaved black truffle",
          isChefSpecial: false,
          isVegetarian: false,
          isGlutenFree: true,
          available: true
        }
      ]
    },
    {
      id: "desserts",
      name: "ARTISANAL DESSERTS",
      subtitle: "House confectionery & ancestral chocolate creations",
      items: [
        {
          id: "dessert-01",
          name: "72% OAXACAN CHOCOLATE GANACHE",
          subtitle: "CACAO DE OAXACA",
          description: "Single-origin Oaxacan bitter chocolate ganache, smoked sea salt crystals, mezcal gelato, and crispy blue corn tuile.",
          price: 18,
          currency: "USD",
          image: "/images/dish-chocolate.jpg",
          imageAlt: "Single origin Oaxacan chocolate ganache with mezcal gelato",
          isChefSpecial: true,
          isVegetarian: true,
          isGlutenFree: false,
          available: true
        },
        {
          id: "dessert-02",
          name: "WILD GUAVA & MEZCAL SORBET",
          subtitle: "SORBETE DE GUAYABA",
          description: "Chilled tropical pink guava sorbet infused with artisanal espadín mezcal, lime zest, and dehydrated chili rim.",
          price: 15,
          currency: "USD",
          image: "/images/dish-guava-sorbet.jpg",
          imageAlt: "Tropical pink guava sorbet in dark slate coupe",
          isChefSpecial: false,
          isVegetarian: true,
          isGlutenFree: true,
          available: true
        }
      ]
    },
    {
      id: "cellar-drinks",
      name: "COCKTAILS & WINE CELLAR",
      subtitle: "Artisanal agave mixology & natural cellar selections",
      items: [
        {
          id: "drink-01",
          name: "SMOKED AGAVE SIGNATURE COCKTAIL",
          subtitle: "EL HUMO ANCESTRAL",
          description: "Espadín artisanal mezcal, roasted pineapple shrub, fresh lime juice, charred rosemary sprig, and volcanic black salt rim.",
          price: 22,
          currency: "USD",
          image: "/images/dish-mezcal-cocktail.jpg",
          imageAlt: "Smoked mezcal craft cocktail with charred rosemary",
          isChefSpecial: true,
          isVegetarian: true,
          isGlutenFree: true,
          available: true
        },
        {
          id: "drink-02",
          name: "CASA MADERO GRAN RESERVA 2020",
          subtitle: "CABERNET SAUVIGNON / SHIRAZ — VALLE DE PARRAS",
          description: "Intense violet red, ripe blackberry, notes of vanilla, toasted cedar wood, and silken lingering tannins. Glass / Bottle available.",
          price: 26,
          currency: "USD",
          image: "/images/dish-wine.jpg",
          imageAlt: "Glass of deep ruby red wine in crystal Bordeaux glass",
          isChefSpecial: false,
          isVegetarian: true,
          isGlutenFree: true,
          available: true
        },
        {
          id: "drink-03",
          name: "NATURAL ARTESIAN SPRING WATER (750ML)",
          subtitle: "AGUA DE PIEDRA NATURAL",
          description: "Ultra-pure natural artesian spring water sourced from the Huasteca Basin. Choice of Still or Sparkling with fresh citrus peel.",
          price: 9,
          currency: "USD",
          image: "/images/dish-water.jpg",
          imageAlt: "Artesian spring water bottle and crystal tumbler with ice",
          isChefSpecial: false,
          isVegetarian: true,
          isGlutenFree: true,
          available: true
        }
      ]
    }
  ]
};

/**
 * Multi-Restaurant Helpers (Spider Web Tier 2 Decoupled Contract)
 * Facilitates hot-swapping any restaurant config in the platform.
 */
export function getRestaurantConfig(restaurantId) {
  // In the current static/prototype phase, returns the default restaurant config.
  // In future Supabase phases, this will resolve tenant configs from the DB engine.
  return defaultRestaurant;
}

export function getAllMenuItems(restaurant = defaultRestaurant) {
  const items = [];
  (restaurant.menuCategories || []).forEach((cat) => {
    cat.items.forEach((item) => {
      items.push({ ...item, categoryId: cat.id, categoryName: cat.name });
    });
  });
  return items;
}

export function getMenuItemById(id, restaurant = defaultRestaurant) {
  const items = getAllMenuItems(restaurant);
  return items.find((item) => item.id === id) || null;
}

