import { ArrowRight } from "lucide-react";

type CtaContent = {
  label: string;
  title: string;
  description: string;
};

function getCtaContent(tags: string[]): CtaContent {
  const isMedical = tags.some((t) =>
    ["医療", "医院", "クリニック", "病院", "眼科"].includes(t)
  );
  const isHospitality = tags.some((t) =>
    ["民泊", "旅館", "宿泊", "ホスピタリティ"].includes(t)
  );

  if (isMedical) {
    return {
      label: "// CTA — MEDICAL WEB",
      title: "医療機関のWeb制作\nご相談ください",
      description:
        "現役眼科医とWebデザインの専門家が連携し、医療広告ガイドラインに対応したサイトを制作します",
    };
  }

  if (isHospitality) {
    return {
      label: "// CTA — HOSPITALITY",
      title: "民泊・旅館業の\nご相談はこちら",
      description:
        "デザインと細部へのこだわりが生む、唯一無二の宿泊体験を共に企画・運営します",
    };
  }

  return {
    label: "// CTA — CONTACT",
    title: "お気軽に\nご相談ください",
    description:
      "事業のご相談、パートナーシップのご提案など、お気軽にご連絡ください",
  };
}

const CONTACT_URL = "https://forms.gle/xcK8c2gDTfy8u6G77";

export function LogCta({ tags }: { tags: string[] }) {
  const { label, title, description } = getCtaContent(tags);

  return (
    <div className="relative mt-16 border border-border/60 bg-card blueprint-grid p-8 md:p-10">
      {/* コーナーブラケット */}
      <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-foreground/35" />
      <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-foreground/35" />
      <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/35" />
      <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/35" />

      <p className="mb-4 font-mono text-[9px] tracking-[0.15em] text-blue-300">
        {label}
      </p>

      <h2 className="mb-4 whitespace-pre-line text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {title}
      </h2>

      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <a
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 uppercase"
      >
        無料相談はこちら
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
