export interface Project {
  id: string;
  slug: string;
  isActive: boolean;
  status: "Live" | "Ongoing" | "Archived";
  title: string;
  shortDescription: string;
  thumbnail: string;
  bannerImage: string;
  links: {
    liveDemo: string;
    github: string;
  };
  meta: {
    timeline: string;
    role: string;
    teamSize: string;
  };
  techStack: string[];
  productInfo: {
    motive: string;
    overview: string;
    userFlow: string;
    futurePlans: string[];
  };
  learnings: string[];
  challenges: string[];
}