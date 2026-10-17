import BottomNavBar from "@/components/ui/bottom-nav-bar";

export default function DemoBottomNavBar() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950 p-4">
      <BottomNavBar stickyBottom={false} />
    </div>
  );
}
