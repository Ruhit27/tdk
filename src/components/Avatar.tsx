// Shown for doctors without a photo: a faceless crop so it can't be mistaken for the actual doctor.
// Source: "Woman in a white coat with a stethoscope smiles in a bright medical office" by Shixart1985,
// https://commons.wikimedia.org/wiki/File:Woman_in_a_white_coat_with_a_stethoscope_smiles_in_a_bright_medical_office.jpg
// CC BY 2.0 (https://creativecommons.org/licenses/by/2.0), cropped and resized.
const PLACEHOLDER = "/doctor-placeholder.webp";

export function Avatar({ name, photo, size = 64, className = "", priority = false }: { name: string; photo: string | null; size?: number; className?: string; priority?: boolean }) {
  return (
    // Photos are pre-sized 360px WebP files, so a plain <img> is lighter than the image optimizer here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo ?? PLACEHOLDER}
      alt={name}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`shrink-0 rounded-2xl bg-surface-2 object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
