import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Search, Pencil, PenLine, FileText, BadgeInfo, Coins, ChevronRight, ChevronLeft } from "lucide-react";
import logoImage from "@/assets/logo-yardhiest.jpg";
import logoNameImage from "@/assets/background-removed.png";

// Back button that toggles the sidebar for all screens.
const BackSidebarButton: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleSidebar}
      aria-label="Hide sidebar"
      className="gap-1 md:hidden"
    >
      <ChevronLeft className="size-4" />
    </Button>
  );
};

// NavLink that closes the mobile sidebar when navigating.
const SidebarNavLink: React.FC<React.ComponentProps<typeof NavLink>> = ({ onClick, ...props }) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  return <NavLink {...props} onClick={handleClick} />;
};

const DocsLayout = () => {
  const location = useLocation();
  const [openSearch, setOpenSearch] = React.useState(false);
  const isActive = (path: string) => {
    const normalized = location.pathname.replace(/\/$/, "");
    const segments = normalized.split("/");
    // Treat the index route (/docs) as "overview" for active highlighting
    if (normalized === "/docs" && path === "overview") {
      return true;
    }
    return segments.includes(path);
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <SidebarProvider className="bg-black">
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas" className="bg-black p-2 border-none">
        <SidebarHeader className="bg-black">
          <div className="flex items-center gap-2 px-1">
            <img src={logoImage} alt="Yard Heist Logo" className="w-8 h-8 rounded-md" />
            <img src={logoNameImage} alt="Yard Heist" className="h-10 object-contain" />
          </div>
        </SidebarHeader>
         <div className="bg-muted h-full py-2  md:rounded-xl">
          <div className=" flex items-center justify-around m-auto gap-3 px-2">
              
              <Button variant="outline" size="sm" onClick={() => setOpenSearch(true)} aria-label="Search" className="w-full flex justify-between">
                <div className="flex items-center gap-2">

                  <Search className="size-4" />
                <span className=" md:inline">Search…</span>
                </div>
                <kbd className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">Ctrl K</kbd>
              </Button>
              <BackSidebarButton />
         </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-white">Gaming on Web and Blockchain</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("overview")}>
                  <SidebarNavLink to="overview" className="flex items-center gap-2">
                    <Pencil className="size-4" />
                    <span>Overview</span>
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("the-game")}>
                  <SidebarNavLink to="the-game" className="flex items-center gap-2">
                    <PenLine className="size-4" />
                    <span>The Game</span>
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("precursors")}>
                  <SidebarNavLink to="precursors" className="flex items-center gap-2">
                    <FileText className="size-4" />
                    <span>Precursors</span>
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("key-cult")}>
                  <SidebarNavLink to="key-cult" className="flex items-center gap-2">
                    <BadgeInfo className="size-4" />
                    <span>Key Cult</span> 
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("tokenomics")}>
                  <SidebarNavLink to="tokenomics" className="flex items-center gap-2">
                    <Coins className="size-4" />
                    <span>Tokenomics</span>
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        </div>
      </Sidebar>
      <SidebarInset>
        {/* Mobile top bar with sidebar trigger */}
        <div className="md:hidden sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex items-center gap-2 px-4 py-2">
            <SidebarTrigger aria-label="Open sidebar" />
            <span className="text-sm font-medium">Docs</span>
          </div>
        </div>
        <div className="min-h-screen bg-background text-foreground">
          <main className="container mx-auto px-4 md:px-8 lg:px-16 py-10">
            <div className="space-y-8 min-h-[80vh]">
              <Outlet />
              <Separator />
              <p className="text-xs text-muted-foreground">Docs are evolving; expect updates.</p>
            </div>
          </main>
        </div>
      </SidebarInset>

      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search docs..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => { setOpenSearch(false); navigate("overview"); }}>
              Overview
            </CommandItem>
            <CommandItem onSelect={() => { setOpenSearch(false); navigate("the-game"); }}>
             The Game
            </CommandItem>
            <CommandItem onSelect={() => { setOpenSearch(false); navigate("precursors"); }}>
              Precursors
            </CommandItem>
            <CommandItem onSelect={() => { setOpenSearch(false); navigate("key-cult"); }}>
              Key Cult
            </CommandItem>
            <CommandItem onSelect={() => { setOpenSearch(false); navigate("tokenomics"); }}>
              Tokenomics
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </SidebarProvider>
  );
};

export default DocsLayout;