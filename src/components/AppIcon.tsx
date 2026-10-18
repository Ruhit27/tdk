import {
  Accessibility,
  Activity,
  Ambulance,
  Apple,
  Baby,
  Bandage,
  Bone,
  BoneFracture,
  Brain,
  BrainCircuit,
  ClipboardList,
  Compass,
  Droplet,
  Droplets,
  Dumbbell,
  Ear,
  Eye,
  FlaskConical,
  Glasses,
  HandHeart,
  Heart,
  HeartPulse,
  Hospital,
  Microscope,
  Pill,
  Plane,
  Ribbon,
  ScanEye,
  ScanHeart,
  Scissors,
  Siren,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  TestTubes,
  Thermometer,
  Toothbrush,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";

const icons = {
  accessibility: Accessibility,
  activity: Activity,
  ambulance: Ambulance,
  apple: Apple,
  baby: Baby,
  bandage: Bandage,
  bone: Bone,
  "bone-fracture": BoneFracture,
  brain: Brain,
  "brain-circuit": BrainCircuit,
  clipboard: ClipboardList,
  compass: Compass,
  droplet: Droplet,
  droplets: Droplets,
  dumbbell: Dumbbell,
  ear: Ear,
  eye: Eye,
  flask: FlaskConical,
  glasses: Glasses,
  "hand-heart": HandHeart,
  heart: Heart,
  "heart-pulse": HeartPulse,
  hospital: Hospital,
  microscope: Microscope,
  pill: Pill,
  plane: Plane,
  ribbon: Ribbon,
  "scan-eye": ScanEye,
  "scan-heart": ScanHeart,
  scissors: Scissors,
  siren: Siren,
  smile: Smile,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  syringe: Syringe,
  "test-tubes": TestTubes,
  thermometer: Thermometer,
  toothbrush: Toothbrush,
  users: Users,
  wind: Wind,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function AppIcon({ name, className = "size-5", strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
}

// One colour per body-system group. Full class strings so Tailwind can see them.
const tones = {
  teal: { tile: "bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300", text: "text-teal-600 dark:text-teal-300" },
  rose: { tile: "bg-rose-100 text-rose-600 dark:bg-rose-400/15 dark:text-rose-300", text: "text-rose-600 dark:text-rose-300" },
  violet: { tile: "bg-violet-100 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300", text: "text-violet-600 dark:text-violet-300" },
  blue: { tile: "bg-blue-100 text-blue-600 dark:bg-blue-400/15 dark:text-blue-300", text: "text-blue-600 dark:text-blue-300" },
  cyan: { tile: "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300", text: "text-cyan-700 dark:text-cyan-300" },
  pink: { tile: "bg-pink-100 text-pink-600 dark:bg-pink-400/15 dark:text-pink-300", text: "text-pink-600 dark:text-pink-300" },
  yellow: { tile: "bg-yellow-100 text-yellow-700 dark:bg-yellow-400/15 dark:text-yellow-300", text: "text-yellow-700 dark:text-yellow-300" },
  orange: { tile: "bg-orange-100 text-orange-600 dark:bg-orange-400/15 dark:text-orange-300", text: "text-orange-600 dark:text-orange-300" },
  indigo: { tile: "bg-indigo-100 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300", text: "text-indigo-600 dark:text-indigo-300" },
  sky: { tile: "bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300", text: "text-sky-600 dark:text-sky-300" },
  emerald: { tile: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300", text: "text-emerald-700 dark:text-emerald-300" },
  purple: { tile: "bg-purple-100 text-purple-600 dark:bg-purple-400/15 dark:text-purple-300", text: "text-purple-600 dark:text-purple-300" },
  amber: { tile: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300", text: "text-amber-700 dark:text-amber-300" },
  fuchsia: { tile: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-400/15 dark:text-fuchsia-300", text: "text-fuchsia-600 dark:text-fuchsia-300" },
  green: { tile: "bg-green-100 text-green-700 dark:bg-green-400/15 dark:text-green-300", text: "text-green-700 dark:text-green-300" },
  lime: { tile: "bg-lime-100 text-lime-700 dark:bg-lime-400/15 dark:text-lime-300", text: "text-lime-700 dark:text-lime-300" },
  red: { tile: "bg-red-100 text-red-600 dark:bg-red-400/15 dark:text-red-300", text: "text-red-600 dark:text-red-300" },
} as const;

export type Tone = keyof typeof tones;

export const toneText = (tone: Tone) => tones[tone].text;

/** A rounded, tinted square holding an icon in its group colour. */
export function IconTile({ name, tone, className = "size-11 rounded-xl", iconClassName = "size-5" }: { name: IconName; tone: Tone; className?: string; iconClassName?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center ${tones[tone].tile} ${className}`}>
      <AppIcon name={name} className={iconClassName} />
    </span>
  );
}
