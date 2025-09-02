import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoName from "@/assets/background-removed.png";
import { XIcon, GithubIcon, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <img src={logoName} alt="" className="w-24 h-16" />
            </div>
            <p className="text-muted-foreground mb-6">
              The future of gaming is here. Experience cutting-edge entertainment
              with the best odds and fastest payouts in the industry.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <XIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <GithubIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Games</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Promotions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">VIP Program</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tournaments</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Live Chat</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Fair Play</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">
              Get the latest news, promotions, and exclusive offers.
            </p>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter your email"
                className="bg-gray-900 border-border"
              />
              <Button
                size="icon"
                className="bg-gradient-to-br from-green-400/50 to-green-700/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] text-black font-bold"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our privacy policy.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Responsible Gaming</a>
              <a href="#" className="hover:text-primary transition-colors">Licensing</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Yard Hiest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;