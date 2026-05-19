/* AI Campaign Engine — generates full campaign structures, ad copies,
   landing page suggestions, performance simulations. No external APIs. */

export type CampaignInput = {
  businessType: string;
  goal: string;
  budget: string;
  location: string;
};

export type GoogleAdsCampaign = {
  campaignType: string;
  bidStrategy: string;
  dailyBudget: string;
  monthlyBudget: string;
  keywords: string[];
  negativeKeywords: string[];
  headlines: string[];
  descriptions: string[];
  callToAction: string;
  adExtensions: string[];
};

export type MetaAdsCampaign = {
  objective: string;
  dailyBudget: string;
  monthlyBudget: string;
  audience: {
    ageRange: string;
    interests: string[];
    behaviors: string[];
    locations: string;
  };
  adFormats: string[];
  primaryText: string;
  hookLines: string[];
  ctaButton: string;
  creativeConcept: string;
};

export type LandingPageSuggestion = {
  heroHeadline: string;
  subHeadline: string;
  cta: string;
  secondaryCta: string;
  sections: { title: string; description: string }[];
  trustElements: string[];
  aboveFold: string[];
};

export type PerformanceSimulation = {
  google: {
    impressions: number;
    clicks: number;
    ctr: string;
    leads: number;
    cpl: string;
    spend: string;
  };
  meta: {
    reach: number;
    clicks: number;
    ctr: string;
    leads: number;
    cpl: string;
    spend: string;
  };
  combined: {
    totalLeads: number;
    totalSpend: string;
    avgCpl: string;
    projectedRoi: string;
  };
};

export type CreativeIdeas = {
  imageAds: string[];
  videoAds: string[];
  reelHooks: string[];
  copyAngles: string[];
};

export type GeneratedCampaign = {
  id: string;
  name: string;
  input: CampaignInput;
  createdAt: string;
  status: "active" | "suggested" | "paused";
  googleAds: GoogleAdsCampaign;
  metaAds: MetaAdsCampaign;
  landingPage: LandingPageSuggestion;
  simulation: PerformanceSimulation;
  creativeIdeas: CreativeIdeas;
  ctaOptions: string[];
  strategyNotes: string;
};

/* ── Budget helpers ──────────────────────────────────────────── */

function parseMonthlyBudget(budget: string): number {
  if (budget.includes("50,000+"))             return 60000;
  if (budget.includes("15,000") && budget.includes("50,000")) return 30000;
  if (budget.includes("5,000") && budget.includes("15,000"))  return 10000;
  if (budget.includes("5,000"))               return 5000;
  return 10000;
}

function fmt(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ── Google Ads generator ────────────────────────────────────── */

function generateGoogleAds(input: CampaignInput, googleBudget: number): GoogleAdsCampaign {
  const loc  = input.location || "Hyderabad";
  const bt   = input.businessType.toLowerCase();
  const daily = Math.round(googleBudget / 30);

  let keywords: string[] = [];
  let negativeKeywords: string[] = [];
  let headlines: string[] = [];
  let descriptions: string[] = [];
  let cta = "Call Now";
  let campaignType = "Search";
  let bidStrategy = "Maximize Conversions";
  let adExtensions: string[] = [];

  if (bt.includes("hospital") || bt.includes("clinic")) {
    keywords = [
      `best ${bt.includes("dental") ? "dentist" : "doctor"} in ${loc}`,
      `${bt.includes("dental") ? "dental clinic" : "hospital"} near me`,
      `${bt.includes("dental") ? "teeth" : "medical"} treatment ${loc}`,
      `affordable ${bt.includes("dental") ? "dental" : "medical"} care ${loc}`,
      `book doctor appointment ${loc}`,
      `top rated clinic ${loc}`,
      `24 hour hospital ${loc}`,
      `specialist doctor ${loc}`,
    ];
    negativeKeywords = ["free", "DIY", "home remedy", "YouTube", "jobs", "salary"];
    headlines = [
      `Best Clinic in ${loc}`,
      "Book Appointment Today",
      "Experienced Doctors",
      "Affordable Treatment",
      "Expert Medical Care",
      "Call Us — Open Now",
      "100+ Happy Patients",
      "Same-Day Appointments",
      "Trusted Healthcare in India",
      "Get Free Consultation",
    ];
    descriptions = [
      `Get expert medical care at our ${loc} clinic. Book your appointment today and experience quality healthcare. Call now.`,
      `Trusted by 500+ patients in ${loc}. Affordable treatment, experienced doctors, and modern facilities. Book online.`,
      `Looking for the best clinic near you? Visit us in ${loc} for personalized care. Easy appointments, fast results.`,
      `We provide top-quality healthcare in ${loc}. Experienced specialists, modern equipment, and patient-first care.`,
      `Don't wait — book your appointment at our ${loc} clinic today. Friendly staff, affordable fees, proven results.`,
    ];
    cta = "Book Appointment";
    adExtensions = ["Call Extension", "Location Extension", "Sitelink: Services", "Sitelink: Book Online", "Callout: Same-Day Appointments"];

  } else if (bt.includes("real estate")) {
    keywords = [
      `flats for sale in ${loc}`,
      `apartments ${loc}`,
      `2BHK flats ${loc}`,
      `property developers ${loc}`,
      `new residential projects ${loc}`,
      `buy flat ${loc}`,
      `premium apartments ${loc}`,
      `affordable housing ${loc}`,
    ];
    negativeKeywords = ["rent", "PG", "hostel", "second hand", "resale", "jobs"];
    headlines = [
      `Premium Flats in ${loc}`,
      "Book Your Dream Home Today",
      "RERA Approved Projects",
      "EMI Starting ₹15,000/month",
      "2 & 3 BHK Available",
      "Limited Inventory Left",
      "Free Site Visit Today",
      "Top Builders in India",
      `Best Location in ${loc}`,
      "Book Now — Get Best Price",
    ];
    descriptions = [
      `Explore premium 2 & 3 BHK apartments in ${loc}. RERA approved, modern amenities, easy home loans. Book free site visit.`,
      `Invest in your dream home in ${loc}. Limited units available at launch price. EMI options available. Call now.`,
      `Looking for the perfect home in ${loc}? We offer premium flats with world-class amenities. Free consultation available.`,
      `New residential project in ${loc} — ideal for families and investors. RERA approved, possession in 18 months.`,
      `Get the best deal on flats in ${loc}. Compare projects, check EMI options, and book your site visit today.`,
    ];
    cta = "Book Free Site Visit";
    bidStrategy = "Target CPA";
    adExtensions = ["Call Extension", "Location Extension", "Sitelink: Floor Plans", "Sitelink: Pricing", "Sitelink: Site Visit"];

  } else if (bt.includes("education")) {
    keywords = [
      `best coaching institute ${loc}`,
      `online courses India`,
      `${input.goal.toLowerCase().includes("school") ? "school admission" : "coaching classes"} ${loc}`,
      `competitive exam coaching ${loc}`,
      `skill development courses India`,
      `professional certification ${loc}`,
      `evening classes ${loc}`,
      `distance learning India`,
    ];
    negativeKeywords = ["free course", "pirated", "crack", "leak", "jobs"];
    headlines = [
      `Top Courses in ${loc}`,
      "Enroll Today — Limited Seats",
      "Expert Faculty",
      "Placement Assistance",
      "Learn & Get Certified",
      "Flexible Batch Timings",
      "Result-Oriented Training",
      "500+ Students Placed",
      `Best Institute in ${loc}`,
      "Free Demo Class Available",
    ];
    descriptions = [
      `Join ${loc}'s leading institute for professional training. Expert faculty, placement support, and flexible timing. Enroll now.`,
      `Build in-demand skills with our certified courses in ${loc}. 500+ students placed. Register for a free demo today.`,
      `Looking for quality education in ${loc}? We offer professional courses with guaranteed placement support. Apply now.`,
      `Expert-led training programs in ${loc}. Industry-relevant curriculum, experienced trainers, 100% placement assistance.`,
      `Limited seats available for our upcoming batch in ${loc}. Join today and transform your career. Call for details.`,
    ];
    cta = "Enroll Now";
    adExtensions = ["Call Extension", "Sitelink: Courses", "Sitelink: Fee Structure", "Callout: Free Demo Class"];

  } else if (bt.includes("e-commerce") || bt.includes("ecommerce")) {
    keywords = [
      `buy online India`,
      `shop ${input.goal} online`,
      `best deals online shopping`,
      `fast delivery India`,
      `top rated products online`,
      `discount online store`,
      `free shipping India`,
      `trusted online shop`,
    ];
    negativeKeywords = ["wholesale", "B2B", "bulk", "second hand", "used"];
    headlines = [
      "Shop Online — Best Prices",
      "Free Delivery on Orders ₹499+",
      "Trusted by 10,000+ Customers",
      "Easy Returns & Refunds",
      "Shop Now — Big Sale On",
      "100% Authentic Products",
      "India's Fast-Growing Store",
      "Order Today, Delivered Tomorrow",
      "New Arrivals Every Week",
      "Exclusive Online Deals",
    ];
    descriptions = [
      `Shop the best products online in India. Free delivery, easy returns, and 100% authentic products. Order now and save.`,
      `Discover thousands of products at unbeatable prices. Trusted by 10,000+ customers. Fast delivery across India.`,
      `Looking for quality products online? Browse our curated collection with best prices and guaranteed delivery.`,
      `India's trusted online store. Shop confidently with secure payments, easy returns, and 24/7 customer support.`,
      `Exclusive deals on top products. New arrivals every week. Free delivery on orders above ₹499. Shop now.`,
    ];
    cta = "Shop Now";
    campaignType = "Search + Shopping";
    adExtensions = ["Sitelink: New Arrivals", "Sitelink: Best Sellers", "Sitelink: Sale", "Callout: Free Delivery", "Price Extension"];

  } else if (bt.includes("restaurant")) {
    keywords = [
      `restaurant near me ${loc}`,
      `food delivery ${loc}`,
      `best restaurant ${loc}`,
      `order food online ${loc}`,
      `dine in ${loc}`,
      `birthday party ${loc} restaurant`,
      `family restaurant ${loc}`,
      `lunch dinner ${loc}`,
    ];
    negativeKeywords = ["recipe", "cooking", "homemade", "kitchen equipment", "jobs"];
    headlines = [
      `Best Food in ${loc}`,
      "Order Online — Fast Delivery",
      "Family Dining Experience",
      "Fresh Ingredients Daily",
      "Special Weekend Offers",
      "Book Your Table Now",
      "Authentic Home-Style Cooking",
      `Top Rated Restaurant ${loc}`,
      "Dine-in or Delivery",
      "Try Our Chef's Special",
    ];
    descriptions = [
      `Experience the best dining in ${loc}. Fresh ingredients, authentic recipes, and warm hospitality. Book your table now.`,
      `Order online and enjoy fast delivery from ${loc}'s top restaurant. Fresh food, great prices, delivered to your door.`,
      `Looking for a great meal in ${loc}? Visit us for authentic cuisine, family dining, and special offers every weekend.`,
      `Celebrate your special moments with us in ${loc}. Private dining, custom menus, and memorable experiences.`,
      `Fresh, delicious food delivered hot to your doorstep in ${loc}. Order now and enjoy exclusive online discounts.`,
    ];
    cta = "Order Now";
    adExtensions = ["Location Extension", "Call Extension", "Sitelink: Menu", "Sitelink: Order Online", "Callout: Free Delivery"];

  } else {
    // Startup + generic
    keywords = [
      `${input.businessType.toLowerCase()} services ${loc}`,
      `best ${input.businessType.toLowerCase()} ${loc}`,
      `professional services ${loc}`,
      `top company ${loc}`,
      `hire ${input.businessType.toLowerCase()} ${loc}`,
      `${input.businessType.toLowerCase()} near me`,
      `reliable service ${loc}`,
      `affordable solutions ${loc}`,
    ];
    negativeKeywords = ["free", "DIY", "jobs", "internship", "course"];
    headlines = [
      `Top ${input.businessType} in ${loc}`,
      "Professional Services",
      "Get Started Today",
      "Trusted by Businesses",
      "Quick & Reliable",
      "Call for Free Consultation",
      "Proven Results",
      "Expert Team Available",
      "Affordable Packages",
      "Book a Free Call",
    ];
    descriptions = [
      `Professional ${input.businessType} services in ${loc}. Experienced team, proven results, competitive pricing. Get started today.`,
      `Looking for reliable ${input.businessType} services? We serve businesses across ${loc} with quality and expertise.`,
      `Transform your business with our ${input.businessType} solutions. Trusted by 100+ clients. Free consultation available.`,
      `Expert ${input.businessType} services tailored for your needs. Fast, reliable, and affordable. Call now to discuss.`,
      `${loc}'s trusted ${input.businessType} partner. We deliver results that matter. Book your free consultation today.`,
    ];
    cta = "Get Free Consultation";
    adExtensions = ["Call Extension", "Sitelink: About", "Sitelink: Services", "Callout: Free Consultation", "Callout: 5+ Years Experience"];
  }

  return {
    campaignType,
    bidStrategy,
    dailyBudget: fmt(daily),
    monthlyBudget: fmt(googleBudget),
    keywords,
    negativeKeywords,
    headlines,
    descriptions,
    callToAction: cta,
    adExtensions,
  };
}

/* ── Meta Ads generator ──────────────────────────────────────── */

function generateMetaAds(input: CampaignInput, metaBudget: number): MetaAdsCampaign {
  const loc   = input.location || "Hyderabad";
  const bt    = input.businessType.toLowerCase();
  const daily = Math.round(metaBudget / 30);

  let objective = "Lead Generation";
  let ageRange = "25–55";
  let interests: string[] = [];
  let behaviors: string[] = [];
  let adFormats: string[] = [];
  let primaryText = "";
  let hookLines: string[] = [];
  let ctaButton = "Learn More";
  let creativeConcept = "";

  if (bt.includes("hospital") || bt.includes("clinic")) {
    objective = "Lead Generation";
    ageRange = "25–65";
    interests = ["Health & Wellness", "Medical Services", "Family Health", "Fitness", "Healthcare"];
    behaviors = ["Parents", "Health-Conscious Users", "Recent Life Events: New Family Member"];
    adFormats = ["Lead Ad with Instant Form", "Carousel: Services", "Video Ad: Doctor Testimonial"];
    primaryText = `Is your family getting the healthcare they deserve? 🏥\n\nAt our ${loc} clinic, we provide expert medical care for every need — from routine checkups to specialist consultations.\n\n✅ Experienced Doctors\n✅ Affordable Treatment\n✅ Easy Appointments\n\nBook your consultation today and take charge of your health!`;
    hookLines = [
      `"Don't ignore that symptom. Here's what most people miss…"`,
      `"Our doctor revealed the #1 mistake people make with their health in ${loc}"`,
      `"500 patients in ${loc} trusted us — here's why"`,
      `"Quick question: When was your last health checkup?"`,
    ];
    ctaButton = "Book Appointment";
    creativeConcept = "Doctor in clinic speaking directly to camera about a common health concern. End with clinic name + appointment CTA. Alternatively, a testimonial carousel from 3 real patients with before/after results.";

  } else if (bt.includes("real estate")) {
    objective = "Lead Generation";
    ageRange = "28–55";
    interests = ["Real Estate", "Home Ownership", "Investment", "Interior Design", "Financial Planning"];
    behaviors = ["Home Buyers", "People with High Net Worth", "Recently Married", "Investment Intent"];
    adFormats = ["Lead Ad with Instant Form", "Video: Property Walkthrough", "Carousel: Floor Plans & Amenities"];
    primaryText = `Your dream home in ${loc} is waiting 🏡\n\nWe're launching premium 2 & 3 BHK apartments in a prime location — RERA approved, with world-class amenities.\n\n✅ Prime Location in ${loc}\n✅ Easy Home Loan Assistance\n✅ RERA Approved Project\n\nLimited units available. Book your FREE site visit today!`;
    hookLines = [
      `"Most people overpay for property. Here's the secret to getting the best price in ${loc}"`,
      `"Last 5 units left at launch price — here's your chance"`,
      `"We walked into 10 apartments in ${loc}. This one won"`,
      `"Your ₹50L can buy you THIS in ${loc} right now"`,
    ];
    ctaButton = "Book Site Visit";
    creativeConcept = "Stunning aerial drone shot of the property with soothing music. Cut to interior walkthrough showing modern kitchen, spacious bedrooms, rooftop amenities. End with launch price and CTA overlay.";

  } else if (bt.includes("startup")) {
    objective = "Brand Awareness + Lead Generation";
    ageRange = "22–45";
    interests = ["Entrepreneurship", "Business", "Technology", "Startups", "Digital Marketing"];
    behaviors = ["Small Business Owners", "Decision Makers", "Frequent Travelers", "LinkedIn Users"];
    adFormats = ["Video Ad: Founder Story", "Carousel: Problem → Solution", "Story Ad: Before/After"];
    primaryText = `Growing a business in India is HARD. 📈\n\nBetween managing operations, hiring, and marketing — it's easy to feel overwhelmed.\n\nThat's why we built a solution that helps ${input.businessType} businesses grow 3× faster with less effort.\n\n✅ Proven Growth System\n✅ Built for Indian Startups\n✅ Results in 30 Days\n\nBook a free strategy call today.`;
    hookLines = [
      `"The #1 reason Indian startups fail — and how to avoid it"`,
      `"We scaled from ₹0 to ₹1Cr in 8 months. Here's exactly how"`,
      `"If your startup isn't growing, it's probably one of these 3 mistakes"`,
      `"Most founders waste money on marketing. Here's the smarter way"`,
    ];
    ctaButton = "Book Free Call";
    creativeConcept = "Founder talking directly to camera about a problem they faced and how they solved it. Authentic, raw, no heavy production. End with product/service reveal + CTA. Alternatively, a rapid-fire 'before/after' transformation reel.";

  } else if (bt.includes("e-commerce") || bt.includes("ecommerce")) {
    objective = "Conversions + Catalogue Sales";
    ageRange = "18–45";
    interests = ["Online Shopping", "Fashion", "Deals & Discounts", "Lifestyle", "Product Category Specific"];
    behaviors = ["Online Shoppers", "Engaged Shoppers", "Buyers of Similar Products"];
    adFormats = ["Dynamic Product Catalogue Ad", "Carousel: Best Sellers", "Retargeting: Abandoned Cart", "Story Ad: Flash Sale"];
    primaryText = `Why pay more when you can get the BEST deals online? 🛍️\n\nShop our exclusive collection with free delivery, easy returns, and 100% authentic products.\n\n🔥 Limited Time Offer\n✅ Free Delivery on ₹499+\n✅ Easy 7-Day Returns\n✅ 10,000+ Happy Customers\n\nShop now and use code SAVE10 for extra 10% off!`;
    hookLines = [
      `"The product that sold out in 48 hours is back in stock — for 24 hours only"`,
      `"I ordered from 5 online stores. Only THIS one delivered on time"`,
      `"This single product changed my morning routine completely"`,
      `"We're giving away free shipping today only — here's how"`,
    ];
    ctaButton = "Shop Now";
    creativeConcept = "Fast-paced product reel showing the product in use, lifestyle context. UGC (user-generated content) style — someone opening the package, reacting to the product. Ends with discount code and shop link.";

  } else if (bt.includes("restaurant")) {
    objective = "Local Awareness + Orders";
    ageRange = "18–50";
    interests = ["Food & Dining", "Restaurants", "Food Delivery", "Cooking", "Local Events"];
    behaviors = ["Frequent Diners", "Food App Users", "Weekend Outing Planners"];
    adFormats = ["Video: Food Preparation", "Story Ad: Daily Special", "Carousel: Menu Highlights"];
    primaryText = `Craving something delicious? 😋\n\nWe're ${loc}'s hidden gem — serving authentic, home-style food that'll make you come back for more.\n\n✅ Fresh Ingredients Daily\n✅ Fast Delivery to ${loc}\n✅ Special Weekend Offers\n\nOrder now and get 20% off your first order!`;
    hookLines = [
      `"We asked 500 people in ${loc} what they miss most. The answer surprised us"`,
      `"This one dish is selling out every single day in ${loc}"`,
      `"The secret recipe that made us ${loc}'s top-rated restaurant"`,
      `"You haven't tried REAL biryani until you've tried ours"`,
    ];
    ctaButton = "Order Now";
    creativeConcept = "Slow-motion food video — sizzling pan, plating, steam rising. Chef explaining the dish. Cut to happy customers eating. End with delivery CTA and discount overlay. Use warm, appetizing color grading.";

  } else {
    objective = "Lead Generation";
    ageRange = "24–55";
    interests = ["Business", "Professional Services", "Industry-Specific", "Local Services", input.businessType];
    behaviors = ["Business Decision Makers", "Small Business Owners"];
    adFormats = ["Lead Ad with Instant Form", "Video: Testimonial", "Carousel: Services & Benefits"];
    primaryText = `Are you looking for reliable ${input.businessType} services in ${loc}? 🎯\n\nWe've helped 100+ businesses get better results with our proven approach.\n\n✅ Experienced Team\n✅ Transparent Pricing\n✅ Results You Can Measure\n\nBook your FREE consultation today — no commitment required.`;
    hookLines = [
      `"Most businesses in ${loc} are making this costly mistake with ${input.businessType.toLowerCase()}"`,
      `"We solved this problem for 100 businesses. Here's what worked"`,
      `"The ${input.businessType.toLowerCase()} strategy that nobody is talking about in India"`,
      `"Why 80% of ${input.businessType.toLowerCase()} efforts fail — and how to be in the 20%"`,
    ];
    ctaButton = "Get Free Consultation";
    creativeConcept = "Professional talking to camera about a common pain point, then revealing their solution. Keep it authentic and conversational. End with a clear CTA and contact info overlay.";
  }

  return {
    objective,
    dailyBudget: fmt(daily),
    monthlyBudget: fmt(metaBudget),
    audience: { ageRange, interests, behaviors, locations: `${loc}, surrounding areas` },
    adFormats,
    primaryText,
    hookLines,
    ctaButton,
    creativeConcept,
  };
}

/* ── Landing page generator ──────────────────────────────────── */

function generateLandingPage(input: CampaignInput): LandingPageSuggestion {
  const loc = input.location || "Hyderabad";
  const bt  = input.businessType.toLowerCase();

  let hero = "", sub = "", cta = "", secondaryCta = "";
  let sections: { title: string; description: string }[] = [];
  let trustElements: string[] = [];
  let aboveFold: string[] = [];

  if (bt.includes("hospital") || bt.includes("clinic")) {
    hero = `Get Expert Medical Care in ${loc}`;
    sub  = "Book your appointment with our experienced doctors today. Affordable, trusted, and patient-first care.";
    cta  = "Book Appointment Now";
    secondaryCta = "Call +91 XXXXX XXXXX";
    sections = [
      { title: "Our Services", description: "List all treatments and specializations clearly with icons." },
      { title: "Meet Our Doctors", description: "Photos + credentials of key doctors. Builds immediate trust." },
      { title: "Patient Testimonials", description: "3-5 real patient stories with photos or star ratings." },
      { title: "Location & Timings", description: "Embedded Google Map, address, hours, and parking info." },
      { title: "Book Appointment Form", description: "Simple form: Name, Phone, Preferred Date, Service Needed." },
    ];
    trustElements = ["NABH Accreditation badge", "X Years Experience", "Y+ Happy Patients", "Google Rating badge", "24/7 Emergency badge"];
    aboveFold = ["Hero headline + CTA button", "Phone number prominently visible", "Star rating / review count", "1-line value proposition"];

  } else if (bt.includes("real estate")) {
    hero = `Premium Apartments in ${loc} — Book at Launch Price`;
    sub  = "RERA approved 2 & 3 BHK homes in a prime location. Limited units available.";
    cta  = "Book Free Site Visit";
    secondaryCta = "Download Floor Plans";
    sections = [
      { title: "Project Highlights", description: "Key selling points: location, connectivity, amenities with icons." },
      { title: "Floor Plans & Pricing", description: "Interactive floor plans with price range. CTA on every plan." },
      { title: "Amenities", description: "Visual grid of amenities: gym, pool, security, parking, etc." },
      { title: "Location Map", description: "Map showing proximity to schools, hospitals, metro, airport." },
      { title: "Site Visit Booking Form", description: "Name, Phone, Preferred Date + 'I'm interested in X BHK' selector." },
    ];
    trustElements = ["RERA Registration Number", "Builder reputation badge", "X+ units sold", "Bank-approved loan badge", "Construction progress %"];
    aboveFold = ["Hero image of property", "Price starting from ₹XX L", "RERA badge visible", "Sticky 'Book Site Visit' button"];

  } else if (bt.includes("education")) {
    hero = `Build Your Future with the Right Course — ${loc}`;
    sub  = "Expert faculty, placement support, and flexible batches. Limited seats available.";
    cta  = "Enroll Now — Limited Seats";
    secondaryCta = "Attend Free Demo Class";
    sections = [
      { title: "Why Choose Us", description: "3-4 key differentiators: faculty, placement, results, fee structure." },
      { title: "Courses Offered", description: "Course cards with duration, fee, placement rate, and enroll CTA." },
      { title: "Placement Record", description: "Company logos where alumni are placed. Numbers and percentages." },
      { title: "Student Testimonials", description: "Video testimonials or text testimonials with photos." },
      { title: "Enrollment Form", description: "Name, Phone, Course Interested In, Preferred Batch Time." },
    ];
    trustElements = ["X+ students placed", "Y partner companies", "ISO certification", "Ministry recognized badge", "Google rating"];
    aboveFold = ["Hero with student success story", "Enrollment deadline counter (urgency)", "Free demo CTA prominently placed", "Trust logos"];

  } else if (bt.includes("e-commerce") || bt.includes("ecommerce")) {
    hero = "Shop the Best Products Online — Delivered Fast Across India";
    sub  = "Free delivery, easy returns, 100% authentic. 10,000+ happy customers.";
    cta  = "Shop Best Sellers Now";
    secondaryCta = "See Today's Deals";
    sections = [
      { title: "Best Sellers", description: "Product grid with price, rating, and 'Add to Cart' CTA." },
      { title: "Why Shop With Us", description: "Free delivery, returns policy, authenticity guarantee icons." },
      { title: "Customer Reviews", description: "Star ratings, review count, recent reviews with photos." },
      { title: "New Arrivals", description: "Latest products with 'NEW' badge and quick add to cart." },
      { title: "Limited Time Offers", description: "Countdown timer for sale items. Creates urgency." },
    ];
    trustElements = ["10K+ happy customers", "Secure payment badges", "Free return policy badge", "4.8★ rating badge", "Fast delivery promise"];
    aboveFold = ["Hero banner with current offer", "Discount code visible", "Trust badges below fold", "Search bar prominent"];

  } else {
    hero = `Get More Customers for Your ${input.businessType} Business in ${loc}`;
    sub  = "Proven growth strategies. Measurable results. Free consultation available.";
    cta  = "Get Free Consultation";
    secondaryCta = "View Our Work";
    sections = [
      { title: "What We Do", description: "Clear service descriptions with icons. Keep it benefit-focused." },
      { title: "Results We've Delivered", description: "Case studies or stats: X% growth, Y leads generated, Z ROI." },
      { title: "How It Works", description: "3-step simple process: Consult → Plan → Execute." },
      { title: "Client Testimonials", description: "Real client quotes with name, business type, and photo." },
      { title: "Contact / Consultation Form", description: "Name, Phone, Business Type, Best Time to Call." },
    ];
    trustElements = ["X+ clients served", "Y years experience", "₹ZCr revenue generated for clients", "Google rating", "Industry awards"];
    aboveFold = ["Clear value proposition headline", "Video or proof image", "CTA button above fold", "Phone number clickable"];
  }

  return { heroHeadline: hero, subHeadline: sub, cta, secondaryCta, sections, trustElements, aboveFold };
}

/* ── Performance simulation ──────────────────────────────────── */

function simulatePerformance(input: CampaignInput, googleBudget: number, metaBudget: number): PerformanceSimulation {
  const bt = input.businessType.toLowerCase();

  // Industry-specific CPC and CTR benchmarks (India market)
  let gCpc = 25, gCtr = 0.045, gConvRate = 0.08;
  let mCpc = 15, mCtr = 0.018, mConvRate = 0.04;

  if (bt.includes("hospital") || bt.includes("clinic")) {
    gCpc = 30; gCtr = 0.05; gConvRate = 0.1;
    mCpc = 12; mCtr = 0.02; mConvRate = 0.05;
  } else if (bt.includes("real estate")) {
    gCpc = 55; gCtr = 0.03; gConvRate = 0.06;
    mCpc = 25; mCtr = 0.015; mConvRate = 0.03;
  } else if (bt.includes("education")) {
    gCpc = 20; gCtr = 0.05; gConvRate = 0.09;
    mCpc = 10; mCtr = 0.022; mConvRate = 0.05;
  } else if (bt.includes("e-commerce") || bt.includes("ecommerce")) {
    gCpc = 15; gCtr = 0.055; gConvRate = 0.05;
    mCpc = 8;  mCtr = 0.025; mConvRate = 0.03;
  } else if (bt.includes("restaurant")) {
    gCpc = 12; gCtr = 0.06; gConvRate = 0.12;
    mCpc = 6;  mCtr = 0.03; mConvRate = 0.06;
  }

  const gClicks      = Math.round(googleBudget / gCpc);
  const gImpressions = Math.round(gClicks / gCtr);
  const gLeads       = Math.round(gClicks * gConvRate);
  const gCpl         = gLeads > 0 ? Math.round(googleBudget / gLeads) : 0;

  const mClicks = Math.round(metaBudget / mCpc);
  const mReach  = Math.round(mClicks / mCtr * 3);
  const mLeads  = Math.round(mClicks * mConvRate);
  const mCpl    = mLeads > 0 ? Math.round(metaBudget / mLeads) : 0;

  const totalLeads = gLeads + mLeads;
  const totalSpend = googleBudget + metaBudget;
  const avgCpl     = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;
  const revenuePerLead = bt.includes("real estate") ? 50000 : bt.includes("hospital") ? 3000 : bt.includes("education") ? 15000 : 5000;
  const projRoi    = totalLeads > 0 ? (((totalLeads * revenuePerLead * 0.15) / totalSpend) * 100).toFixed(0) : "0";

  return {
    google: {
      impressions: gImpressions,
      clicks:      gClicks,
      ctr:         `${(gCtr * 100).toFixed(1)}%`,
      leads:       gLeads,
      cpl:         fmt(gCpl),
      spend:       fmt(googleBudget),
    },
    meta: {
      reach:  mReach,
      clicks: mClicks,
      ctr:    `${(mCtr * 100).toFixed(1)}%`,
      leads:  mLeads,
      cpl:    fmt(mCpl),
      spend:  fmt(metaBudget),
    },
    combined: {
      totalLeads,
      totalSpend: fmt(totalSpend),
      avgCpl:     fmt(avgCpl),
      projectedRoi: `${projRoi}%`,
    },
  };
}

/* ── Creative ideas generator ────────────────────────────────── */

function generateCreativeIdeas(input: CampaignInput): CreativeIdeas {
  const bt  = input.businessType.toLowerCase();
  const loc = input.location || "Hyderabad";

  let imageAds: string[] = [];
  let videoAds: string[] = [];
  let reelHooks: string[] = [];
  let copyAngles: string[] = [];

  if (bt.includes("hospital") || bt.includes("clinic")) {
    imageAds  = ["Doctor smiling with patient — warm, trustworthy tone", "Modern clinic interior with clean equipment", "Before/after health transformation (appropriate for service)", "Team photo of all doctors with credentials overlay"];
    videoAds  = ["Doctor speaking to camera: 'Here's what you need to know about [condition]…' — builds authority", "Patient testimonial: 90-second story of how the clinic helped them", "Clinic tour: 30-second walkthrough of modern facilities", "Animated explainer: 'How to book an appointment in 3 steps'"];
    reelHooks = ["'Most people wait too long to see a doctor. Here's the sign you shouldn't ignore…'", "'Quick health check you can do at home right now'", "'We treated 500 patients in 2024. Here's what we learned'", "'The #1 question patients ask us — answered in 60 seconds'"];
    copyAngles = ["Trust & Safety: 'Experienced doctors, modern equipment'", "Affordability: 'Quality care at prices that won't break the bank'", "Convenience: 'Same-day appointments, no long waits'", "Results: 'X patients treated, Y% satisfaction rate'"];

  } else if (bt.includes("real estate")) {
    imageAds  = ["Aerial drone shot of the property against sunset", "Modern kitchen/living room interior with lifestyle staging", "Infographic: 'Why invest in property in 2025'", "Comparison: Rent forever vs Own your home — side by side"];
    videoAds  = ["60-second property walkthrough with professional voiceover and background music", "Testimonial from a happy buyer: 'Here's why we chose this project'", "Time-lapse of construction progress showing commitment", "Animation: 'Your investment today vs in 10 years'"];
    reelHooks = ["'We toured 12 apartments in " + loc + ". This one shocked us'", "'The property mistake that costs buyers ₹20L+'", "'What ₹50L buys you in " + loc + " right now (spoiler: it's incredible)'", "'RERA explained in 60 seconds — what every buyer must know'"];
    copyAngles = ["FOMO: 'Limited units at launch price'", "ROI: 'Property values in this area grew 18% last year'", "Lifestyle: 'Imagine waking up to this view every morning'", "Security: 'RERA approved — your investment is protected'"];

  } else if (bt.includes("e-commerce") || bt.includes("ecommerce")) {
    imageAds  = ["Product flat lay on clean white background with price badge", "Lifestyle photo: person using the product in real context", "Before/after using the product (if applicable)", "UGC-style: screenshot of a real 5-star review with product photo"];
    videoAds  = ["Unboxing video — authentic, UGC style", "30-second product demo showing the top 3 features", "Customer testimonial: 'I've been using this for 30 days — here's my honest review'", "Comparison: Our product vs competitor (tactful)"];
    reelHooks = ["'I ordered from 5 online stores. Only one got it right'", "'This product sold out 3 times already — and I finally got one'", "'Honest review after 30 days — was it worth it?'", "'The one thing I wish I bought sooner'"];
    copyAngles = ["Social proof: '10,000+ happy customers'", "Scarcity: 'Only 50 left in stock'", "Value: 'Free delivery + easy returns = zero risk'", "Transformation: 'Before vs after adding this to your routine'"];

  } else {
    imageAds  = ["Team photo with professional backdrop — builds trust", "Client result showcase: before vs after with permission", "Infographic: '5 reasons to choose a professional for ' + input.businessType", "Quote graphic: customer testimonial with star rating"];
    videoAds  = ["Founder story: 'Why I started this business and who we serve'", "Behind-the-scenes: day in the life at the company", "Client success story: case study in 90 seconds", "Educational: top tip for the target audience"];
    reelHooks = ["'The #1 mistake most business owners make with " + input.businessType.toLowerCase() + "'", "'We served 100 clients. Here's what actually works'", "'Quick question: Are you doing this wrong?'", "'Results we achieved in 30 days for a " + loc + " business'"];
    copyAngles = ["Problem → Solution: 'Tired of X? We fix that'", "Authority: 'X years helping businesses like yours'", "Results: 'Average client sees Y% improvement in Z weeks'", "Risk reversal: 'Free consultation — no commitment required'"];
  }

  return { imageAds, videoAds, reelHooks, copyAngles };
}

/* ── CTA options ─────────────────────────────────────────────── */

function generateCtaOptions(input: CampaignInput): string[] {
  const bt = input.businessType.toLowerCase();
  const baseOptions = [
    "Get Free Consultation",
    "Talk to an Expert Now",
    "Start Today — No Commitment",
    "Book Your Free Call",
    "Get a Custom Quote",
    "Claim Your Free Audit",
  ];

  if (bt.includes("hospital") || bt.includes("clinic"))
    return ["Book Appointment Now", "Get Free Consultation", "Call Doctor Now", "Check Availability", "Talk to Us Today", ...baseOptions.slice(0, 2)];
  if (bt.includes("real estate"))
    return ["Book Free Site Visit", "Get Best Price Now", "Download Floor Plans", "Talk to Sales Team", "Reserve Your Flat Today", ...baseOptions.slice(0, 2)];
  if (bt.includes("education"))
    return ["Enroll Now", "Attend Free Demo", "Download Brochure", "Check Seat Availability", "Register Today", ...baseOptions.slice(0, 2)];
  if (bt.includes("e-commerce") || bt.includes("ecommerce"))
    return ["Shop Now", "Grab This Deal", "Add to Cart", "Buy Before It's Gone", "Claim Discount Now", "Order Today"];
  if (bt.includes("restaurant"))
    return ["Order Now", "Reserve a Table", "Get 20% Off First Order", "View Our Menu", "Call to Book", ...baseOptions.slice(0, 2)];

  return baseOptions;
}

/* ── Strategy notes ──────────────────────────────────────────── */

function generateStrategyNotes(input: CampaignInput): string {
  const bt = input.businessType.toLowerCase();
  if (bt.includes("hospital") || bt.includes("clinic"))
    return "Healthcare campaigns perform best with Google Search Ads (high purchase intent) + Local SEO. Meta Ads work for awareness and remarketing. Focus on trust signals (credentials, patient reviews). Avoid aggressive sales language — use empathy-first messaging.";
  if (bt.includes("real estate"))
    return "Real estate has a long sales cycle — focus on lead quality over quantity. Use Google Ads for immediate buyer intent. Meta Ads for awareness + retargeting site visitors. Dedicated landing pages per project/location significantly improve conversion rates.";
  if (bt.includes("startup"))
    return "Startup campaigns need to build trust fast. Lead with social proof and founder story. Meta Ads outperform Google for early-stage awareness. Invest in video content. Run small Google Ads tests on branded + competitor keywords.";
  if (bt.includes("e-commerce") || bt.includes("ecommerce"))
    return "E-commerce campaigns should prioritize ROAS over lead count. Meta Catalogue Ads + Google Shopping are the highest-ROI channels. Retargeting abandoned carts typically delivers 5-8× ROAS. Test multiple creatives weekly and kill non-performers fast.";
  if (bt.includes("education"))
    return "Education campaigns are highly seasonal — budget aggressively during admission seasons (Jan-Feb, May-June). Google Ads for 'course near me' intent. Meta Ads for parent + student audiences. Lead magnets (free demo, brochure) significantly improve form fill rate.";
  if (bt.includes("restaurant"))
    return "Restaurant campaigns are hyper-local — target within 5km radius only. Google My Business optimization is non-negotiable. Meta Ads with food video content drive strong engagement. Run offer-based campaigns (20% off first order) to drive first-time orders.";
  return "Start with Google Ads to capture existing demand, then layer Meta Ads for awareness. Monitor which channel delivers lower CPL and shift budget accordingly. Review campaign performance weekly for the first month.";
}

/* ── Main export ─────────────────────────────────────────────── */

export function generateCampaign(input: CampaignInput): GeneratedCampaign {
  const monthly  = parseMonthlyBudget(input.budget);
  const gBudget  = Math.round(monthly * 0.6);
  const mBudget  = monthly - gBudget;
  const loc      = input.location.trim() || "Your City";

  return {
    id:        `camp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name:      `${input.businessType} — ${input.goal} Campaign (${loc})`,
    input,
    createdAt: new Date().toISOString(),
    status:    "suggested",
    googleAds:     generateGoogleAds(input, gBudget),
    metaAds:       generateMetaAds(input, mBudget),
    landingPage:   generateLandingPage(input),
    simulation:    simulatePerformance(input, gBudget, mBudget),
    creativeIdeas: generateCreativeIdeas(input),
    ctaOptions:    generateCtaOptions(input),
    strategyNotes: generateStrategyNotes(input),
  };
}

/* ── localStorage persistence ────────────────────────────────── */

const CAMP_KEY = "snr_campaigns_v1";

export function getCampaigns(): GeneratedCampaign[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CAMP_KEY) ?? "[]"); } catch { return []; }
}

export function saveCampaign(c: GeneratedCampaign): void {
  const all = getCampaigns();
  all.unshift(c);
  localStorage.setItem(CAMP_KEY, JSON.stringify(all));
}

export function updateCampaignStatus(id: string, status: GeneratedCampaign["status"]): void {
  const all = getCampaigns().map((c) => c.id === id ? { ...c, status } : c);
  localStorage.setItem(CAMP_KEY, JSON.stringify(all));
}

export function deleteCampaign(id: string): void {
  localStorage.setItem(CAMP_KEY, JSON.stringify(getCampaigns().filter((c) => c.id !== id)));
}
