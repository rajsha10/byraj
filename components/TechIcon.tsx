import React from "react";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiNodedotjs,
  SiDocker,
  SiBun,
  SiPython,
  SiFastapi,
  SiReact,
  SiMongodb,
  SiSolidity,
  SiIpfs,
  SiOpenai,
  SiFramer
} from "react-icons/si";
import { FaHardHat  } from "react-icons/fa";
import { SiEthers  } from "react-icons/si";
import { BsDatabaseFill } from "react-icons/bs";

// Define a type for the props
type TechIconProps = {
  tech: string;
  className?: string;
};

// Define a type for the icon map
type IconMap = {
  [key: string]: React.ComponentType<{ className?: string }>;
};

// Map tech names to icons
// We use a case-insensitive approach by converting tech to lowercase
const iconMap: IconMap = {
  typescript: SiTypescript,
  "next.js": SiNextdotjs,
  tailwindcss: SiTailwindcss,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  "node.js": SiNodedotjs,
  docker: SiDocker,
  bun: SiBun,
  python: SiPython,
  fastapi: SiFastapi,
  react: SiReact,
  mongodb: SiMongodb,
  solidity: SiSolidity,
  ipfs: SiIpfs,
  hardhat: FaHardHat,
  "ethers.js": SiEthers,
  "openai api": SiOpenai,
  "framer motion": SiFramer,
  appwrite: BsDatabaseFill,
};

const TechIcon: React.FC<TechIconProps> = ({ tech, className = "h-4 w-4" }) => {
  const IconComponent = iconMap[tech.toLowerCase()];

  if (!IconComponent) {
    // Return a default icon or null if no match is found
    return null; 
  }

  return <IconComponent className={className} />;
};

export default TechIcon;