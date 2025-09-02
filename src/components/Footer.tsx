import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoName from "@/assets/background-removed.png";
import { XIcon, GithubIcon, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start">
              <img src={logoName} alt="Yard Heist Logo" className="w-20 h-14 sm:w-24 sm:h-16" />
            </div>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base text-center sm:text-left">
              The future of gaming is here. Experience cutting-edge entertainment
              with the best odds and fastest payouts in the industry.
            </p>
            <div className="flex gap-2 justify-center sm:justify-start">
              <Button variant="ghost" size="icon" className="hover:text-primary h-8 w-8 sm:h-10 sm:w-10">
                <XIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary h-8 w-8 sm:h-10 sm:w-10">
                <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary h-8 w-8 sm:h-10 sm:w-10">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary h-8 w-8 sm:h-10 sm:w-10">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-4 text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Games</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Promotions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">VIP Program</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Tournaments</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Leaderboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-4 text-base sm:text-lg">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Live Chat</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Security</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">Fair Play</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-foreground mb-4 text-base sm:text-lg">Stay Updated</h4>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Get the latest news, promotions, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Input
                placeholder="Enter your email"
                className="bg-gray-900 border-border text-sm sm:text-base"
              />
              <Button
                size="icon"
                className="bg-gradient-to-br from-green-400/50 to-green-700/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] text-black font-bold h-10 w-full sm:w-10 flex-shrink-0"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              By subscribing, you agree to our privacy policy.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Responsible Gaming</a>
              <a href="#" className="hover:text-primary transition-colors">Licensing</a>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-right">
              © 2024 Yard Heist. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;