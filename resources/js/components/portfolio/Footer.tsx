import React from 'react';
import { personalInfo } from '@/data/portfolio-mock-data';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-primary">{personalInfo.name}</h3>
            <p className="text-foreground/70 mt-2">{personalInfo.title}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h4 className="font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#hero" className="text-foreground/70 hover:text-primary">Home</a></li>
                <li><a href="#about" className="text-foreground/70 hover:text-primary">About</a></li>
                <li><a href="#portfolio" className="text-foreground/70 hover:text-primary">Portfolio</a></li>
                <li><a href="#contact" className="text-foreground/70 hover:text-primary">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center md:text-left">
          <p className="text-foreground/60 text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
