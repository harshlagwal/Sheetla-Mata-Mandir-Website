import { AnimatedHikeCard, Stat } from "@/components/ui/card-25";
import { Clock, Zap, Mountain } from "lucide-react";

export default function AnimatedHikeCardDemo() {
  const hikeProps = {
    title: "Mountain Hike",
    images: [
      "https://cdn.21st.dev/assets/mirror/0b/0b9ef6fff23ee3255a419d5ad0e5c6610d9a4e54a3441136e15f01b255594567.jpg",
      "https://cdn.21st.dev/assets/mirror/fa/fa990e27e24f85bb298dbfac93c4d755bcf6114e42db1c4ed0c1facdfffe295d.jpg",
      "https://cdn.21st.dev/assets/mirror/b3/b38d5a16fdd42ba0ca83609e8270ed11388d73949585f7389c411d5476924579.jpg",
    ],
    stats: [
      {
        icon: <Clock className="h-4 w-4" />,
        label: "~6 Hours",
      },
      {
        icon: <Mountain className="h-4 w-4" />,
        label: "8 km",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        label: "Medium",
      },
    ] as Stat[],
    description:
      "Hiking on a mountain blends physical challenge with natural beauty, offering sweeping views and a profound sense of accomplishment.",
    href: "#",
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <AnimatedHikeCard {...hikeProps} />
    </div>
  );
}
